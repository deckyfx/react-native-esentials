import Queue from './queue';

// @flow
export const State = {
  IDLE: 0,
  RUNNING: 1,
  STOPPED: 2,
};

/**
 * A small and simple library for promise-based queues. It will execute enqueued
 * functions concurrently at a specified speed. When a task is being resolved or
 * rejected, an event is emitted.
 *
 * @example
 *    const queue = new Queue({
 *      concurrent: 1,
 *      interval: 2000
 *    });
 *
 *    queue.on("resolve", data => console.log(data));
 *    queue.on("reject", error => console.error(error));
 *
 *    queue.enqueue(asyncTaskA);
 *    queue.enqueue([asyncTaskB, asyncTaskC]);
 *
 * @class   QueuePromise
 * @extends Queue
 */
export default class QueuePromise extends Queue {
  /**
   * @type    {number}
   * @access  private
   */
  lastRan = 0;

  /**
   * @type    {TimeoutID}
   * @access  private
   */
  timeoutId;

  /**
   * @type    {number}  Amount of tasks currently handled by the queue
   * @access  private
   */
  currentlyHandled = 0;

  /**
   * @type    {State}
   * @access  public
   */
  state = State.IDLE;

  /**
   * @type    {Object}  options
   * @type    {number}  options.concurrent  How many tasks should be executed in parallel
   * @type    {number}  options.interval    How often should new tasks be executed (in ms)
   * @type    {boolean} options.start       Whether it should automatically execute new tasks as soon as they are added
   * @access  public
   */
  options = {
    concurrent: 1,
    interval: 500,
    start: false,
  };

  /**
   * Initializes a new queue instance with provided options.
   *
   * @param   {Object}  options
   * @param   {number}  options.concurrent  How many tasks should be executed in parallel
   * @param   {number}  options.interval    How often should new tasks be executed (in ms)
   * @param   {boolean} options.start       Whether it should automatically execute new tasks as soon as they are added
   * @return  {Queue}
   */
  constructor(options = {}) {
    super();

    this.options = {...this.options, ...options};
    this.options.interval = parseInt(this.options.interval, 10);
    this.options.concurrent = parseInt(this.options.concurrent, 10);
  }

  /**
   * Starts the queue if it has not been started yet.
   *
   * @emits   start
   * @return  {void}
   * @access  public
   */
  start() {
    if (this.state !== State.RUNNING && !this.isEmpty) {
      this.state = State.RUNNING;

      if (this._onStart) {
        this._onStart();
      }

      (async () => {
        while (this.shouldRun) {
          await this.dequeue();
        }
      })();
    }
  }

  /**
   * Forces the queue to stop. New tasks will not be executed automatically even
   * if `options.start` was set to `true`.
   *
   * @emits   stop
   * @return  {void}
   * @access  public
   */
  stop() {
    clearTimeout(this.timeoutId);

    this.state = State.STOPPED;

    if (this._onStop) {
      this._onStop();
    }
  }

  /**
   * Goes to the next request and stops the loop if there are no requests left.
   *
   * @emits   end
   * @return  {void}
   * @access  private
   */
  finalize() {
    this.currentlyHandled -= 1;

    if (this.currentlyHandled === 0 && this.isEmpty) {
      this.stop();

      // Finalize doesn't force queue to stop as `Queue.stop()` does. Therefore,
      // new tasks should be still resolved automatically if `options.start` was
      // set to `true` (see `Queue.enqueue`):
      this.state = State.IDLE;

      if (this._onEnd) {
        this._onEnd();
      }
    }
  }

  /**
   * Executes _n_ concurrent (based od `options.concurrent`) promises from the
   * queue.
   *
   * @return  {Promise<any>}
   * @emits   resolve
   * @emits   reject
   * @emits   dequeue
   * @access  private
   */
  async execute() {
    const promises = [];

    this.elements.forEach((promise, id) => {
      // Maximum amount of parallel tasks:
      if (this.currentlyHandled < this.options.concurrent) {
        this.currentlyHandled++;
        this.elements.delete(id);

        promises.push(
          Promise.resolve(true)
            .then(() => {
              if (this._onExecuting) {
                this._onExecuting(id);
              }
              return promise();
            })
            .then((value) => {
              if (this._onResolved) {
                this._onResolved(id, value);
              }
              return value;
            })
            .catch((error) => {
              if (this._onRejected) {
                this._onRejected(id, error);
              }
              return error;
            })
            .finally(() => {
              if (this._onDequeued) {
                this._onDequeued(id);
              }
              this.finalize();
            }),
        );
      }
    });

    // Note: Promise.all will reject if any of the concurrent promises fail,
    // regardless if they are all finished yet! This is why we are emitting
    // events per task (and not per batch of tasks with respect to
    // `concurrent`):
    const output = await Promise.all(promises);

    return this.options.concurrent === 1 ? output[0] : output;
  }

  /**
   * Executes _n_ concurrent (based od `options.concurrent`) promises from the
   * queue.
   *
   * @return  {Promise<any>}
   * @emits   resolve
   * @emits   reject
   * @emits   dequeue
   * @access  public
   */
  dequeue() {
    const {interval} = this.options;

    return new Promise((resolve, reject) => {
      const timeout = Math.max(0, interval - (Date.now() - this.lastRan));

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.lastRan = Date.now();
        this.execute().then(resolve);
      }, timeout);
    });
  }

  /**
   * Adds tasks to the queue.
   *
   * @param   {Function|Array}  tasks     Tasks to add to the queue
   * @throws  {Error}                     When task is not a function
   * @return  {void}
   * @access  public
   */
  enqueue(tasks) {
    if (Array.isArray(tasks)) {
      tasks.map((task) => this.enqueue(task));
      return;
    }

    if (typeof tasks !== 'function') {
      throw new Error(`You must provide a function, not ${typeof tasks}.`);
    }

    super.enqueue(tasks);

    // Start the queue if the queue should resolve new tasks automatically and
    // hasn't been forced to stop:
    if (this.options.start && this.state !== State.STOPPED) {
      this.start();
    }
  }

  /**
   * @see     enqueue
   * @access  public
   */
  add(tasks) {
    this.enqueue(tasks);
  }

  /**
   * Checks whether the queue is not empty and not stopped.
   *
   * @type    {boolean}
   * @access  public
   */
  get shouldRun() {
    return !this.isEmpty && this.state !== State.STOPPED;
  }

  _onStart = null;
  _onStop = null;
  _onEnd = null;
  _onExecuting = null;
  _onResolved = null;
  _onRejected = null;
  _onDequeued = null;
  setOnStart(cb) {
    this._onStart = cb;
  }
  removeOnStart() {
    this._onStart = null;
  }
  setOnStop(cb) {
    this._onStop = cb;
  }
  removeOnStop() {
    this._onStop = null;
  }
  setOnEnd(cb) {
    this._onEnd = cb;
  }
  removeOnEnd() {
    this._onEnd = null;
  }
  setOnResolved(cb) {
    this._onResolved = cb;
  }
  removeOnResolved() {
    this._onResolved = null;
  }
  setOnExecuting(cb) {
    this._onExecuting = cb;
  }
  removeOnExecuting() {
    this._onExecuting = null;
  }
  setOnRejected(cb) {
    this._onRejected = cb;
  }
  removeOnRejected() {
    this._onRejected = null;
  }
  setOnDequeued(cb) {
    this._onDequeued = cb;
  }
  removeOnDequeued() {
    this._onDequeued = null;
  }
}
