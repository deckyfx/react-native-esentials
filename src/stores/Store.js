// zustand like store state implementation combined with async storage

import {useEffect, useState} from 'react';

// Register extra state here
import {SampleState, modifySampleState} from './SampleState';

export const StoreKeys = Object.freeze({
  // USER_PREFERENCES_LANGUAGE: "USER_PREFERENCES_LANGUAGE",
});

class Store {
  constructor() {
    if (!Store.instance) {
      Store.instance = this;
    }

    this._state = {
      value: 0,

      // Register default State Here
      ...SampleState,
    };

    this._listeners = new Set();

    // Initialize object
    this.init();
    return Store.instance;
  }

  init() {
    // Init the state here
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

  // Properties & Methods
  increaseValue() {
    this.modify({
      value1: this._state.value + 1,
    });
  }

  // Register modifier here
  modifySampleState(...args) {
    this.modify(modifySampleState(this.state, ...args));
  }
}

export const StoreInstance = new Store();
export const S = StoreInstance; // short hand

export const useStore = (selector = (_state) => _state) => {
  const [state, setState] = useState(selector(StoreInstance.state));
  useEffect(
    () => StoreInstance.subscribe((_state) => setState(selector(_state))),
    [],
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
      [],
    );
    return state;
  };
};
