class Queue {
  uniqueId = 0;
  constructor(initial = null) {
    this.elements = new Map();
    if (initial instanceof Queue) {
      this.elements = initial;
    }
    if (Array.isArray(initial)) {
      this.elements = new Map();
      this.enqueue(initial);
    }
  }

  enqueue(element) {
    if (Array.isArray(element)) {
      element.map((_element) => this.enqueue(_element));
      return;
    }
    this.uniqueId = (this.uniqueId + 1) % Number.MAX_SAFE_INTEGER;
    this.elements.set(this.uniqueId, element);
    return element;
  }

  dequeue() {
    const item = this.at(0);
    this.elements.delete(0);
    return item;
  }

  clear() {
    this.uniqueId = 0;
    return this.elements.clear();
  }

  keyAt(index) {
    return Array.from(this.elements.keys())[index];
  }

  at(index) {
    const key = this.keyAt(index);
    if (!key) {
      return undefined;
    }
    return {
      key: key,
      value: this.elements.get(key),
    };
  }

  get first() {
    return this.at(0);
  }

  get last() {
    return this.at(this.length - 1);
  }

  get length() {
    return this.elements.size;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get array() {
    return Array.from(this.elements.keys()).map((key) => {
      return {
        key: key,
        value: this.elements.get(key),
      };
    });
  }
}

export default Queue;
