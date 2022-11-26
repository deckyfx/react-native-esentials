import EventBus, { createUseEventBus } from "../../../../src/events/EventBus";

class MyEventBus extends EventBus {
  constructor() {
    super();
    if (!MyEventBus.instance) {
      MyEventBus.instance = this;
    }
    // Initialize object
    super.init();
    return MyEventBus.instance;
  }
}

export const EventBusInstance = new MyEventBus();
export const E = EventBusInstance; // short hand

export const useEventBus = createUseEventBus(EventBusInstance);
