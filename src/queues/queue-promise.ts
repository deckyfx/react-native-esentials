import Queue, { ResolvedQueueItem } from './queue';

export enum State {
  IDLE = 0,
  RUNNING = 1,
  STOPPED = 2,
}

export type QueuePromiseConfig = {
  concurrent?: number | string;
  interval?: number | string;
  start?: boolean;
};

export default class QueuePromise extends Queue<Function> {
  lastRan: number = 0;
  timeoutId: NodeJS.Timeout | null = null;
  currentlyHandled: number = 0;
  state: State = State.IDLE;
  options: QueuePromiseConfig = {
    concurrent: 1,
    interval: 500,
    start: false,
  };

  _onStart: Function | null = null;
  _onStop: Function | null = null;
  _onEnd: Function | null = null;
  _onExecuting: Function | null = null;
  _onResolved: Function | null = null;
  _onRejected: Function | null = null;
  _onDequeued: Function | null = null;

  constructor(
    initial: Queue<Function> | QueuePromise | Function[] | null | undefined = null,
    options: QueuePromiseConfig = {},
  ) {
    super(initial as Queue<Function> | Function[] | null | undefined);

    this.options = { ...this.options, ...options };
    this.options.interval = parseInt(this.options.interval as string, 10);
    this.options.concurrent = parseInt(this.options.concurrent as string, 10);
  }

  start(): void {
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

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId!);
    }

    this.state = State.STOPPED;

    if (this._onStop) {
      this._onStop();
    }
  }

  finalize(): void {
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

  async execute(): Promise<unknown> {
    const promises: Promise<unknown>[] = [];

    this.elements.forEach((promise, id) => {
      // Maximum amount of parallel tasks:
      if (this.currentlyHandled < (this.options.concurrent as number)) {
        this.currentlyHandled++;
        this.elements.delete(id);

        promises.push(
          Promise.resolve(true)
            .then(() => {
              if (this._onExecuting) {
                this._onExecuting(id);
              }
              return (promise as Function)();
            })
            .then((value: unknown) => {
              if (this._onResolved) {
                this._onResolved(id, value);
              }
              return value;
            })
            .catch((error: Error) => {
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

  dequeue(): ResolvedQueueItem<Function> | undefined {
    const { interval } = this.options;

    new Promise((resolve, reject) => {
      const timeout = Math.max(0, (interval as number) - (Date.now() - this.lastRan));

      if (this.timeoutId) {
        clearTimeout(this.timeoutId!);
      }
      this.timeoutId = setTimeout(() => {
        this.lastRan = Date.now();
        this.execute().then(resolve);
      }, timeout);
    });

    return;
  }

  enqueue(tasks: Function | Function[]): Function | undefined {
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
    return tasks;
  }

  add(tasks: Function | Function[]) {
    this.enqueue(tasks);
  }

  get shouldRun(): boolean {
    return !this.isEmpty && this.state !== State.STOPPED;
  }
  setOnStart(cb: () => void) {
    this._onStart = cb;
  }
  removeOnStart() {
    this._onStart = null;
  }
  setOnStop(cb: () => void) {
    this._onStop = cb;
  }
  removeOnStop() {
    this._onStop = null;
  }
  setOnEnd(cb: () => void) {
    this._onEnd = cb;
  }
  removeOnEnd() {
    this._onEnd = null;
  }
  setOnResolved(cb: (id: number, value: unknown) => void) {
    this._onResolved = cb;
  }
  removeOnResolved() {
    this._onResolved = null;
  }
  setOnExecuting(cb: (id: number) => void) {
    this._onExecuting = cb;
  }
  removeOnExecuting() {
    this._onExecuting = null;
  }
  setOnRejected(cb: (id: number, error: Error) => void) {
    this._onRejected = cb;
  }
  removeOnRejected() {
    this._onRejected = null;
  }
  setOnDequeued(cb: (id: number) => void) {
    this._onDequeued = cb;
  }
  removeOnDequeued() {
    this._onDequeued = null;
  }
}
