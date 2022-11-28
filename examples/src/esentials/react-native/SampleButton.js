import React from "react";

import { TouchableOpacity, Text, View } from "react-native";

import { S } from "../stores/Store";
import { E } from "../events/EventBus";

import { SampleEvent } from "../events/SampleEvent";

const SampleButton = ({}) => {
  const modifyValue = () => {
    S.modifySampleState();
  };

  const dispatchEvent = () => {
    E.dispatch(SampleEvent, []);
  };

  return (
    <View>
      <TouchableOpacity onPress={modifyValue}>
        <Text>Modify Value</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={dispatchEvent}>
        <Text>Dispatch Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SampleButton;
