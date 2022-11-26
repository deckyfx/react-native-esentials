import { useState } from "react";

import reactLogo from "./assets/react.svg";

import "./App.css";

import StoreExample from "./esentials/react/stores/StoreExample";
import EventBusExample from "./esentials/react/eventbus/EventBusExample";
import QueueExample from "./esentials/react/queue/QueueExample";
import QueuePromiseExample from "./esentials/react/queue-promise/QueuePromiseExample";

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
