// zustand like store state implementation combined with async storage

import { useEffect, useState } from "react";

export const StoreKeys = Object.freeze({
  // USER_PREFERENCES_LANGUAGE: "USER_PREFERENCES_LANGUAGE",
});

class Store {
  constructor() {
    if (this.constructor.name !== "Store") {
      return;
    }
    if (!Store.__instance__) {
      Store.__instance__ = this;
    }
    this.init();
    return Store.__instance__;
  }

  init() {
    this._listeners = new Set();
    this._state = this.intial();
  }

  intial() {
    return {};
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this._listeners.forEach((listener) => {
      listener(this._state);
    });
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  modify(newState) {
    this.state = {
      ...this._state,
      ...newState,
    };
  }
}

export const StoreInstance = new Store();
export const S = StoreInstance; // short hand

export const useStore = (selector = (_state) => _state) => {
  const [state, setState] = useState(selector(StoreInstance.state));
  useEffect(
    () => StoreInstance.subscribe((_state) => setState(selector(_state))),
    []
  );
  return state;
};

export const createUseStore = (store) => {
  if (!store instanceof Store) {
    return null;
  }
  return (selector = (_state) => _state) => {
    const [state, setState] = useState(selector(store.state));
    useEffect(
      () => store.subscribe((_state) => setState(selector(_state))),
      []
    );
    return state;
  };
};

export default Store;
