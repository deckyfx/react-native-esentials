import React, { useEffect } from "react";

import { View, Text } from "react-native";

import { useStore } from "../stores/Store";
import { useEventBus } from "../events/EventBus";

import useQueuePromise from "../hooks/useQueuePromise";

import { SampleStateHook } from "../stores/SampleState";
import { SampleEventMatcher } from "../events/SampleEvent";

const SampleDisplay = ({}) => {
  const state = useStore(SampleStateHook);

  const [qp, qpstate, taskId, { addTask, start, stop }] = useQueuePromise();

  const newTask = (arg) => {
    return async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("Pending task", arg);
          resolve();
        }, 1000);
      });
  };

  useEventBus(
    SampleEventMatcher(),
    () => {
      console.log("triggered");
    },
    []
  );

  useEffect(() => {
    console.log("Changed?", state);
    if (state == 3) {
      start();
    }
  }, [state]);

  useEffect(() => {
    addTask(newTask(1));
    addTask(newTask(2));
    addTask(newTask(3));
  }, []);

  return (
    <View>
      <Text>{state}</Text>
      <Text>{qpstate}</Text>
      <Text>{taskId}</Text>
    </View>
  );
};

export default SampleDisplay;
