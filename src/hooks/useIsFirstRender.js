// https://usehooks-ts.com/react-hook/use-is-first-render

import {useRef} from 'react';

export default useIsFirstRender = () => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
};
