import { E } from './MyEventBus';

export const SampleEvent = {
  channel: 'channel',
  event: 'event',
};

export const SampleEventMatcher = () => E.isMatching(SampleEvent.channel, SampleEvent.event);
