/// <reference types="react" />
import _Store from './stores/Store';
import _EventBus from './events/EventBus';
import _Queue from './queues/queue';
import _QueuePromise, { QueuePromiseState as _QueuePromiseState } from './queues/queue-promise';
import { TimerUtil as _TimerUtil } from './hooks/useTime';
export declare const Store: typeof _Store;
export declare const StoreInstance: _Store;
export declare const S: _Store;
export declare const useStore: (selector?: (state: any) => any) => any;
export declare const createUseStore: (instance: _Store) => ((selector?: (state: any) => any) => any) | null;
export declare const EventBus: typeof _EventBus;
export declare const EventBusInstance: _EventBus;
export declare const E: _EventBus;
export declare const useEventBus: (filter: RegExp | (string | number) | {
    channel: string | number;
    event: string | number;
} | (string | number)[] | ((...args: any[]) => any), callback: (...args: any[]) => any, deps?: unknown[]) => (_event: (string | number) | {
    channel: string | number;
    event: string | number;
}, args?: unknown[]) => void;
export declare const createUseEventBus: (eventbus: _EventBus) => ((filter: RegExp | (string | number) | {
    channel: string | number;
    event: string | number;
} | (string | number)[] | ((...args: any[]) => any), callback: (...args: any[]) => any, deps?: unknown[]) => (_event: (string | number) | {
    channel: string | number;
    event: string | number;
}, args?: unknown[]) => void) | undefined;
export declare const QueuePromise: typeof _QueuePromise;
export declare const QueuePromiseState: typeof _QueuePromiseState;
export declare const useBoolean: (defaultValue?: boolean | undefined) => {
    value: boolean;
    setValue: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};
export declare const useCountdown: (countdownOption: import("./hooks/useCountdown").CountdownOption, callback: () => void | null | undefined) => [number, boolean, import("./hooks/useCountdown").CountdownControllers];
export declare const useCounter: (initialValue?: number | undefined) => {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setCount: import("react").Dispatch<import("react").SetStateAction<number>>;
};
export declare const useDebounce: <T>(value: T, delay?: number | undefined) => T;
export declare const useDebouncedEffect: (action: import("react").EffectCallback, deps: never[], delay?: number) => void;
export declare const useDeferredPromise: <DeferType>() => [() => {
    resolve: (value: DeferType) => void;
    reject: (value: unknown) => void;
    promise: Promise<DeferType>;
}, {
    resolve: (value: DeferType) => void;
    reject: (value: unknown) => void;
    promise: Promise<DeferType>;
} | null];
export declare const useEffectOnce: (effect: import("react").EffectCallback) => void;
export declare const useFetch: <T = unknown>(url?: string | undefined, options?: RequestInit | undefined) => import("./hooks/useFetch").FetchState<T>;
export declare const useInterval: (callback: () => void, delay: number | null, autostart?: boolean) => import("./hooks/useInterval").UseIntervalOutput;
export declare const useIsFirstRender: () => boolean;
export declare const useMap: <K, V>(initialState?: import("./hooks/useMap").MapOrEntries<K, V>) => [Omit<Map<K, V>, "clear" | "set" | "delete">, import("./hooks/useMap").MapActions<K, V>];
export declare const usePromise: <T>(task: () => Promise<T>) => {
    status: import("./hooks/usePromise").UsePromiseState;
    result: T | null | undefined;
    error: Error | null | undefined;
    run: () => void;
};
export declare const useQueue: <T>(initialState?: _Queue<T>) => [_Queue<T>, import("./hooks/useQueue").QueueActions<T>];
export declare const useQueuePromise: (queuepromise?: _QueuePromise | null | undefined, callback?: import("./hooks/useQueuePromise").QueuePromiseCallbacks) => {
    querypromise: _QueuePromise;
    state: _QueuePromiseState;
    actions: import("./hooks/useQueuePromise").QueuePromiseActions;
};
export declare const useStep: (maxStep: number) => [number, import("./hooks/useStep").UseStepHelpers];
export declare const useThrotle: <T>(value: T, delay?: number | undefined) => T;
export declare const useTimeout: (callback: () => void, delay: number | null, autostart?: boolean) => import("./hooks/useTimeout").UseTimeoutOutput;
export declare const useToggle: (defaultValue?: boolean | undefined) => {
    value: boolean;
    toggle: () => void;
    setValue: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export declare const useUpdateEffect: (effect: import("react").EffectCallback, deps?: import("react").DependencyList | undefined) => void;
export declare const useTime: (format?: import("./hooks/useTime").TimeFormat) => import("./hooks/useTime").TimerUtilGetTimeOutput;
export declare const TimerUtil: typeof _TimerUtil;
declare const _default: {
    Store: typeof _Store;
    StoreInstance: _Store;
    S: _Store;
    useStore: (selector?: (state: any) => any) => any;
    createUseStore: (instance: _Store) => ((selector?: (state: any) => any) => any) | null;
    EventBus: typeof _EventBus;
    EventBusInstance: _EventBus;
    useEventBus: (filter: RegExp | (string | number) | {
        channel: string | number;
        event: string | number;
    } | (string | number)[] | ((...args: any[]) => any), callback: (...args: any[]) => any, deps?: unknown[]) => (_event: (string | number) | {
        channel: string | number;
        event: string | number;
    }, args?: unknown[]) => void;
    createUseEventBus: (eventbus: _EventBus) => ((filter: RegExp | (string | number) | {
        channel: string | number;
        event: string | number;
    } | (string | number)[] | ((...args: any[]) => any), callback: (...args: any[]) => any, deps?: unknown[]) => (_event: (string | number) | {
        channel: string | number;
        event: string | number;
    }, args?: unknown[]) => void) | undefined;
    QueuePromise: typeof _QueuePromise;
    QueuePromiseState: typeof _QueuePromiseState;
    useBoolean: (defaultValue?: boolean | undefined) => {
        value: boolean;
        setValue: import("react").Dispatch<import("react").SetStateAction<boolean>>;
        setTrue: () => void;
        setFalse: () => void;
        toggle: () => void;
    };
    useCountdown: (countdownOption: import("./hooks/useCountdown").CountdownOption, callback: () => void | null | undefined) => [number, boolean, import("./hooks/useCountdown").CountdownControllers];
    useCounter: (initialValue?: number | undefined) => {
        count: number;
        increment: () => void;
        decrement: () => void;
        reset: () => void;
        setCount: import("react").Dispatch<import("react").SetStateAction<number>>;
    };
    useDebounce: <T>(value: T, delay?: number | undefined) => T;
    useDebouncedEffect: (action: import("react").EffectCallback, deps: never[], delay?: number) => void;
    useDeferredPromise: <DeferType>() => [() => {
        resolve: (value: DeferType) => void;
        reject: (value: unknown) => void;
        promise: Promise<DeferType>;
    }, {
        resolve: (value: DeferType) => void;
        reject: (value: unknown) => void;
        promise: Promise<DeferType>;
    } | null];
    useEffectOnce: (effect: import("react").EffectCallback) => void;
    useFetch: <T_1 = unknown>(url?: string | undefined, options?: RequestInit | undefined) => import("./hooks/useFetch").FetchState<T_1>;
    useInterval: (callback: () => void, delay: number | null, autostart?: boolean) => import("./hooks/useInterval").UseIntervalOutput;
    useIsFirstRender: () => boolean;
    useMap: <K, V>(initialState?: import("./hooks/useMap").MapOrEntries<K, V>) => [Omit<Map<K, V>, "clear" | "set" | "delete">, import("./hooks/useMap").MapActions<K, V>];
    usePromise: <T_2>(task: () => Promise<T_2>) => {
        status: import("./hooks/usePromise").UsePromiseState;
        result: T_2 | null | undefined;
        error: Error | null | undefined;
        run: () => void;
    };
    useQueue: <T_3>(initialState?: _Queue<T_3>) => [_Queue<T_3>, import("./hooks/useQueue").QueueActions<T_3>];
    useQueuePromise: (queuepromise?: _QueuePromise | null | undefined, callback?: import("./hooks/useQueuePromise").QueuePromiseCallbacks) => {
        querypromise: _QueuePromise;
        state: _QueuePromiseState;
        actions: import("./hooks/useQueuePromise").QueuePromiseActions;
    };
    useStep: (maxStep: number) => [number, import("./hooks/useStep").UseStepHelpers];
    useThrotle: <T_4>(value: T_4, delay?: number | undefined) => T_4;
    useTimeout: (callback: () => void, delay: number | null, autostart?: boolean) => import("./hooks/useTimeout").UseTimeoutOutput;
    useToggle: (defaultValue?: boolean | undefined) => {
        value: boolean;
        toggle: () => void;
        setValue: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    };
    useUpdateEffect: (effect: import("react").EffectCallback, deps?: import("react").DependencyList | undefined) => void;
    useTime: (format?: import("./hooks/useTime").TimeFormat) => import("./hooks/useTime").TimerUtilGetTimeOutput;
    TimerUtil: typeof _TimerUtil;
};
export default _default;
