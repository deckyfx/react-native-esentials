// Event bus

import {useEffect} from 'react';

class EventBus {
  constructor() {
    if (!EventBus.instance) {
      EventBus.instance = this;
    }

    this._subscribers = [];

    // Initialize object
    this.init();
    return EventBus.instance;
  }

  init() {
    // Init the state here
  }

  subscribe(filter, callback) {
    if (filter === undefined || filter === null) {
      return undefined;
    }
    if (callback === undefined || callback === null) {
      return undefined;
    }

    this._subscribers = [...this._subscribers, [filter, callback]];

    return () => {
      this._subscribers = this._subscribers.filter(
        (subscriber) => subscriber[1] !== callback,
      );
    };
  }

  dispatch(event, args = []) {
    let {type} = event;
    if (typeof event === 'string') {
      type = event;
    }

    if (typeof event === 'string') {
      args.push({type});
    } else {
      args.unshift(event);
    }

    this._subscribers.forEach(([filter, callback]) => {
      if (typeof filter === 'string' && filter !== type) {
        return;
      }
      if (Array.isArray(filter) && !filter.includes(type)) {
        return;
      }
      if (filter instanceof RegExp && !filter.test(type)) {
        return;
      }
      if (typeof filter === 'function' && !filter(...args)) {
        return;
      }
      callback(...args);
    });
  }

  isMatching(channel, type) {
    return (event) => event.channel === channel && event.type === type;
  }
}

export const EventBusInstance = new EventBus();
export const E = EventBusInstance; // short hand

export const useEventBus = (type, callback, deps = []) => {
  useEffect(() => EventBusInstance.subscribe(type, callback), deps);
  return EventBusInstance.dispatch;
};

export const createUseEventBus = (eventbus) => {
  if (!eventbus instanceof EventBus) {
    return;
  }
  return (type, callback, deps = []) => {
    useEffect(() => eventbus.subscribe(type, callback), deps);
    return eventbus.dispatch;
  };
};
