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


/**
 * @description Master class for EventBus
 * @author Decky Fx
 *
 * @class EventBus
 * @typedef {EventBus}
 */
class EventBus {
  // tslint:disable-next-line:variable-name
  static __instance__: EventBus;
  // tslint:disable-next-line:variable-name
  protected _subscribers: EventBusSubscriberListener[] = [];
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

  subscribe(filter: EventBusSubscriberListenerFilter, callback: (...args: any[]) => any): undefined | (() => void) {
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

  /**
   * @author Decky Fx
   * @description Dispatch a signal to an Event identifier
   *
   * @param {(AllowedFilterType | EventBusSubscriberListenerFilterConfig)} event Event identifier
   * @param {...any[]} args Arguments to be sent along with the signal
   */
  dispatch(event: AllowedFilterType | EventBusSubscriberListenerFilterConfig, ...args: any[]): void {
    let { event: eventName } = event as EventBusSubscriberListenerFilterConfig;

    if (typeof event === 'string') {
      eventName = event;
    }

    if (typeof event === 'string') {
      args.unshift({ event: eventName });
    } else {
      args.unshift(event);
    }

    this._subscribers.forEach(([filter, callback]) => {
      if (typeof filter === 'string' && filter !== eventName) {
        return;
      }
      if (Array.isArray(filter) && !filter.includes(eventName)) {
        return;
      }
      if (filter instanceof RegExp && !filter.test(eventName.toString())) {
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

/**
 * @author Decky Fx
 * @description Dispatch a signal to an Event identifier
 *
 * @param {EventBusSubscriberListenerFilter} filter Event identifer, or a event filter
 * @param {(...args: any[]) => any} callback callback to be run when signal is received
 * @param {unknown[]} [deps=[]] dependencies, ussualy leave it to empty
 * @returns {any, deps?: {}) => (event: AllowedFilterType | EventBusSubscriberListenerFilterConfig, ...args: {}) => void}
 */
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
