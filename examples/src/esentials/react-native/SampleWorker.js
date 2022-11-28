import QueuePromise from "../src/queues/queue-promise";

const qp = new QueuePromise();

const task = (arg) => {
  return async () => {
    return new Promise((res) =>
      setTimeout(() => {
        console.log("Wait for 1 seconds", arg);
      }, 1000)
    );
  };
};

qp.enqueue(task(0));
qp.enqueue(task(1));
qp.enqueue(task(2));
