// https://usehooks-ts.com/react-hook/use-effect-once

import {useEffect} from 'react';

function useEffectOnce(effect) {
  useEffect(effect, []);
}

export default useEffectOnce;
