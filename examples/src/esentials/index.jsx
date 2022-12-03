import StoreExample from './stores/StoreExample';
import EventBusExample from './eventbus/EventBusExample';
import QueueExample from './queue/QueueExample';
import QueuePromiseExample from './queue-promise/QueuePromiseExample';
import UseDebounceEffectSample from './useDebouncedEffect/UseDebounceEffectSample';
import UseCounterSample from './useCounter/UseCounterSample';
import UseTimeoutSample from './useTimeout/UseTimeoutSample';
import UseCountdownSample from './useCountdown/UseCountdownSample';
import UseSelectionSample from './useSelection/UseSelectionSample';

const Examples = () => {
  return (
    <div className="App lex flex-col space-y-4">
      <StoreExample />
      <EventBusExample />
      <QueueExample />
      <QueuePromiseExample />
      <UseDebounceEffectSample />
      <UseCounterSample />
      <UseTimeoutSample />
      <UseCountdownSample />
      <UseSelectionSample />
    </div>
  );
};

export default Examples;
