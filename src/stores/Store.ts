// zustand like store state implementation combined with async storage

import { useEffect, useState } from 'react';

type StoreState = any;
type StoreSubscriberListener = (state: StoreState) => void;
type StoreUseSelector = (state: StoreState) => any;

class Store {
  static __instance__: Store;
  private _subscribers = new Set<StoreSubscriberListener>();
  private _state: StoreState;
  constructor() {
    if (this.constructor.name !== 'Store') {
      return;
    }
    if (!Store.__instance__) {
      Store.__instance__ = this;
    }
    this.init();
    return Store.__instance__;
  }

  init(): void {
    this._subscribers = new Set();
    this._state = this.intial();
  }

  intial(): any {
    return {};
  }

  get state(): StoreState {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this._subscribers.forEach((subscriber) => {
      subscriber(this._state);
    });
  }

  subscribe(subscriber: StoreSubscriberListener): () => void {
    this._subscribers.add(subscriber);
    return () => {
      this._subscribers.delete(subscriber);
    };
  }

  modify(newState: any = {}): void {
    this.state = {
      ...this._state,
      ...newState,
    };
  }
}

export const StoreInstance = new Store();
export const S = StoreInstance; // short hand

export const useAStore = (selector: StoreUseSelector = (_state: StoreState) => _state) => {
  const [state, setState] = useState(selector(StoreInstance.state));
  useEffect(() => StoreInstance.subscribe((_state: StoreState) => setState(selector(_state))));
  return state;
};

export const createUseStore = (instance: Store) => {
  if (!(instance instanceof Store)) {
    return null;
  }
  return (selector: StoreUseSelector = (_state: StoreState) => _state) => {
    const [state, setState] = useState(selector(StoreInstance.state));
    useEffect(() => StoreInstance.subscribe((_state: StoreState) => setState(selector(_state))));
    return state;
  };
};

export default Store;
