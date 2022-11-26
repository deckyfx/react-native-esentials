export const SampleState = {
  samplevalue: 0, // declare state values
};

export const modifySampleState = (state, ...args) => {
  SampleState.samplevalue = state.samplevalue + 1; // modify the value
  return SampleState; // must return json data
};

export const SampleStateHook = (state) => state.samplevalue; // declare what is returned
