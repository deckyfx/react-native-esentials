export type ResolvedQueueItem<T> = {
  key: number;
  value: T;
};

class Queue<T> {
  uniqueId = 0;
  elements: Map<number, T>;
  constructor(initial: Queue<T> | T[] | null | undefined = null) {
    this.elements = new Map();
    if (initial instanceof Queue) {
      this.elements = initial.elements;
    }
    if (Array.isArray(initial)) {
      this.elements = new Map();
      this.enqueue(initial as T[]);
    }
  }

  enqueue(element: T | T[]): T | undefined {
    if (Array.isArray(element)) {
      element.map((_element) => this.enqueue(_element));
      return;
    }
    this.uniqueId = (this.uniqueId + 1) % Number.MAX_SAFE_INTEGER;
    this.elements.set(this.uniqueId, element);
    return element;
  }

  dequeue(): ResolvedQueueItem<T> | undefined {
    const item = this.at(0);
    if (!item) {
      return undefined;
    }
    this.elements.delete(item.key);
    return item;
  }

  clear(): void {
    this.uniqueId = 0;
    return this.elements.clear();
  }

  keyAt(index: number): number {
    return Array.from(this.elements.keys())[index];
  }

  at(index: number): ResolvedQueueItem<T> | undefined {
    const key = this.keyAt(index);
    if (!key) {
      return undefined;
    }
    return {
      key,
      value: this.elements.get(key) as T,
    };
  }

  get first(): ResolvedQueueItem<T> | undefined {
    return this.at(0);
  }

  get last(): ResolvedQueueItem<T> | undefined {
    return this.at(this.length - 1);
  }

  get length(): number {
    return this.elements.size;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get array(): ResolvedQueueItem<T>[] {
    return Array.from(this.elements.keys()).map((key) => {
      return {
        key,
        value: this.elements.get(key) as T,
      };
    });
  }
}

export default Queue;
