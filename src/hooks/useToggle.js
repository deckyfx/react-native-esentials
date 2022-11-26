// https://usehooks-ts.com/react-hook/use-toggle

import {useCallback, useState} from 'react';

export default useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, toggle, setValue];
};
