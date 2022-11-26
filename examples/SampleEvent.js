import {E} from '../src/events/EventBus';

export const SampleEvent = {
  channel: 'channel',
  type: 'type',
};

export const SampleEventMatcher = () =>
  E.isMatching(SampleEvent.channel, SampleEvent.type);