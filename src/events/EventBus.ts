// Event bus

import { useEffect } from 'react';

type AllowedFilterType = string | number;
type EventBusSubscriberListenerFilterConfig = { channel: AllowedFilterType; event: AllowedFilterType };
type EventBusSubscriberListenerFilter =
  | AllowedFilterType
  | RegExp
  | AllowedFilterType[]
  | ((...args: any[]) => any)
  | EventBusSubscriberListenerFilterConfig;
type EventBusSubscriberListener = [EventBusSubscriberListenerFilter, (...args: any[]) => any];

class EventBus {
  // tslint:disable-next-line:variable-name
  static __instance__: EventBus;
  // tslint:disable-next-line:variable-name
  private _subscribers: EventBusSubscriberListener[] = [];
  constructor() {
    if (this.constructor.name !== 'EventBus') {
      this.init();
      return;
    }
    if (!EventBus.__instance__) {
      EventBus.__instance__ = this;
    }
    // Initialize object
    this.init();
    return EventBus.__instance__;
  }

  init(): void {
    this._subscribers = [];
  }

  subscribe(filter: EventBusSubscriberListenerFilter, callback: (...args: any[]) => any) {
    if (filter === undefined || filter === null) {
      return undefined;
    }
    if (callback === undefined || callback === null || typeof callback !== 'function') {
      return undefined;
    }

    this._subscribers = [...this._subscribers, [filter, callback]];

    return () => {
      this._subscribers = this._subscribers.filter((subscriber) => subscriber[1] !== callback);
    };
  }

  dispatch(_event: AllowedFilterType | EventBusSubscriberListenerFilterConfig, args: unknown[] = []): void {
    let { event } = _event as EventBusSubscriberListenerFilterConfig;

    if (typeof _event === 'string') {
      event = _event;
    }

    if (typeof _event === 'string') {
      args.push({ event });
    } else {
      args.unshift(_event);
    }

    this._subscribers.forEach(([filter, callback]) => {
      if (typeof filter === 'string' && filter !== event) {
        return;
      }
      if (Array.isArray(filter) && !filter.includes(event)) {
        return;
      }
      if (filter instanceof RegExp && !filter.test(event.toString())) {
        return;
      }
      if (typeof filter === 'function' && !filter(...args)) {
        return;
      }
      callback(...args);
    });
  }

  isMatching(
    channel: AllowedFilterType,
    eventName: AllowedFilterType,
  ): (event: EventBusSubscriberListenerFilterConfig) => boolean {
    return (event: EventBusSubscriberListenerFilterConfig) => event.channel === channel && event.event === eventName;
  }
}

export const EventBusInstance = new EventBus();
export const E = EventBusInstance; // short hand

export const useEventBus = (
  filter: EventBusSubscriberListenerFilter,
  callback: (...args: any[]) => any,
  deps: unknown[] = [],
) => {
  useEffect(() => EventBusInstance.subscribe(filter, callback), deps);
  return EventBusInstance.dispatch;
};

export const createUseEventBus = (eventbus: EventBus) => {
  if (eventbus instanceof EventBus === false) {
    return;
  }
  return (filter: EventBusSubscriberListenerFilter, callback: (...args: any[]) => any, deps: unknown[] = []) => {
    useEffect(() => eventbus.subscribe(filter, callback), deps);
    return eventbus.dispatch;
  };
};

export default EventBus;
