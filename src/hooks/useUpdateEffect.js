// https://usehooks-ts.com/react-hook/use-update-effect

import {useEffect} from 'react';

import {useIsFirstRender} from 'usehooks-ts';

export default useUpdateEffect = (effect, deps) => {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
