import { useState } from "react";

import "./App.css";

import StoreExample from "./esentials/stores/StoreExample";
import EventBusExample from "./esentials/eventbus/EventBusExample";
import QueueExample from "./esentials//queue/QueueExample";
import QueuePromiseExample from "./esentials/queue-promise/QueuePromiseExample";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App lex flex-col space-y-4">
      <StoreExample />
      <EventBusExample />
      <QueueExample />
      <QueuePromiseExample />
    </div>
  );
}

export default App;
