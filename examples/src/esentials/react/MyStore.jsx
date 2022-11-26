import Store, { createUseStore } from "../../../../src/stores/Store";

// Register extra state here
import { SampleState, modifySampleState } from "./SampleState";

class MyStore extends Store {
  // Construct the store here
  constructor() {
    super();
    if (!MyStore.instance) {
      MyStore.instance = this;
    }
    this.init();
    return MyStore.instance;
  }

  // Init the store here
  init() {
    super.init();
    this._state = this.initial();
  }

  initial() {
    // Init the state here
    return {
      ...SampleState,
    };
  }

  // Register modifier here
  modifySampleState(...args) {
    this.modify(modifySampleState(this.state, ...args));
  }
}

export const StoreInstance = new MyStore();
export const S = StoreInstance; // short hand

export const useStore = createUseStore(StoreInstance);
