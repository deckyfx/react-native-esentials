// https://usehooks-ts.com/react-hook/use-boolean

import {useCallback, useState} from 'react';

export default useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return {value, setValue, setTrue, setFalse, toggle};
};
