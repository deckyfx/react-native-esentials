// https://bobbyhadz.com/blog/react-cannot-assign-to-current-because-read-only-property

import { useRef } from 'react';

type DeferredPromise<DeferType> = {
  resolve: (value: DeferType) => void;
  reject: (value: unknown) => void;
  promise: Promise<DeferType>;
};

const useDeferredPromise = <DeferType>(): [() => DeferredPromise<DeferType>, DeferredPromise<DeferType> | null] => {
  const deferRef = useRef<DeferredPromise<DeferType> | null>(null);

  const defer = () => {
    const deferred = {} as DeferredPromise<DeferType>;

    const promise = new Promise<DeferType>((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    deferred.promise = promise;
    deferRef.current = deferred;
    return deferRef.current;
  };

  return [defer, deferRef.current];
};

export default useDeferredPromise;
