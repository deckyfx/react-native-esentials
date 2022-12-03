import { useEffect } from 'react';
// https://usehooks-ts.com/react-hook/use-boolean

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export type UseSelectionSelectorFunction<T> = (option: T) => boolean;

export interface UseSelectionSelectorObject {
  [key: string]: string | number;
}

export type UseSelectionSelector<T> = T | T[] | UseSelectionSelectorFunction<T>;

export type UseSelectionOutput<T> = {
  all: UseSelectionArray<T>;
  options: T[];
  selected: T[];
  actions: {
    set: (options: T[]) => void;
    select: (selector: UseSelectionSelector<T>) => void;
    add: (options: T | T[]) => void;
    remove: (selector: UseSelectionSelector<T>) => void;
  };
};

export type UseSelectionConfig<T> = {
  allowMultiple?: boolean;
  toggleSelected?: boolean;
  onSelectionChange?: (oldselecteds: T[], newselecteds: T[]) => void;
  defaultSelected?: UseSelectionSelector<T>;
};

export type UseSelectionOption<T> = {
  value: T;
  selected: boolean;
};

export const isSelectionSelectorArray = <T>(
  object: T[] | UseSelectionSelectorFunction<T> | NonNullable<T>,
): object is T[] => {
  return Array.isArray(object);
};

export const isSelectionSelectorFunction = <T>(
  object: T[] | UseSelectionSelectorFunction<T> | NonNullable<T>,
): object is UseSelectionSelectorFunction<T> => {
  return typeof object === 'function';
};

export const isUseSelectionOption = <T>(object: T | UseSelectionOption<T>): object is UseSelectionOption<T> => {
  return (object as UseSelectionOption<T>).selected !== undefined;
};

export class UseSelectionArray<T> {
  private configuration: UseSelectionConfig<T>;
  private selectionOptions: UseSelectionOption<T>[] = [];
  constructor(
    initial: UseSelectionArray<T> | UseSelectionOption<T>[] | T[] = [],
    configuration: UseSelectionConfig<T> = {},
  ) {
    this.configuration = configuration;
    if (initial instanceof UseSelectionArray<T>) {
      this.selectionOptions = initial.selectionOptions.map((option) => option);
    } else {
      initial.forEach((value, index) => {
        if (isUseSelectionOption(value)) {
          this.selectionOptions[index] = value;
        } else {
          this.selectionOptions[index] = {
            value,
            selected: false,
          };
        }
      });
    }
    if (configuration.defaultSelected) {
      this.select(configuration.defaultSelected);
    }
    return this;
  }

  private spreadNew(options: UseSelectionArray<T> | UseSelectionOption<T>[] | T[] | null = null): UseSelectionArray<T> {
    return new UseSelectionArray<T>(options ? options : this, this.configuration);
  }

  private test(selector: UseSelectionSelector<T>, option: UseSelectionOption<T>) {
    console.log(selector);
    if (!option.value || !selector) {
      return false;
    }
    if (isSelectionSelectorArray(selector) && selector.includes(option.value as T)) {
      return true;
    } else if (isSelectionSelectorFunction(selector) && selector(option.value as T)) {
      return true;
    } else if (option.value === selector) {
      return true;
    } else {
      return false;
    }
  }

  select(selector: UseSelectionSelector<T> | null | undefined): UseSelectionArray<T> {
    if (!selector) {
      return this.spreadNew();
    }
    let validFound = false;
    let newstates = [];
    if (!this.configuration.allowMultiple) {
      // if doesn't allow multiple, reset all flag to false, before set markers
      newstates = this.selectionOptions.map((option) => {
        return {
          ...option,
          selected: false,
        };
      });
    }
    newstates = this.selectionOptions.map((option) => {
      let valid = this.test(selector, option);
      const result = {
        ...option,
        selected:
          validFound && !this.configuration.allowMultiple // if valid found and can't multiple true
            ? false // force false
            : valid && this.configuration.toggleSelected // if mode toggle and true
            ? !option.selected // toggle previous value
            : !valid && this.configuration.allowMultiple // if not true and allow multiple
            ? option.selected // retain previous value
            : valid, // otherwise set as is
      };
      if (valid && !this.configuration.allowMultiple) {
        validFound = true;
      }
      return result;
    });
    return this.spreadNew(newstates);
  }

  add(options: T | T[]): UseSelectionArray<T> {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        this.selectionOptions.push({
          value: option,
        } as UseSelectionOption<T>);
      });
      return this.spreadNew();
    }
    this.selectionOptions.push({
      value: options,
    } as UseSelectionOption<T>);
    return this.spreadNew();
  }

  remove(selector: UseSelectionSelector<T>): UseSelectionArray<T> {
    if (!selector) {
      return this;
    }
    const filtered = this.selectionOptions.filter((option, index) => {
      return this.test(selector, option);
    });
    return this.spreadNew(filtered);
  }

  get options(): T[] {
    return this.selectionOptions.map((option) => {
      return option.value;
    });
  }

  get selected(): T[] {
    return this.selectionOptions
      .filter((option) => {
        return option.selected;
      })
      .map((option) => {
        return option.value;
      });
  }
}

const useSelection = <T>(initialOptions: T[] = [], config: UseSelectionConfig<T>): UseSelectionOutput<T> => {
  const [options, setOptions] = useState(new UseSelectionArray<T>(initialOptions, config));

  const set = useCallback((newoptions: UseSelectionArray<T> | UseSelectionOption<T>[] | T[]): void => {
    setOptions(new UseSelectionArray<T>(newoptions, config));
  }, []);
  const select = useCallback((selector: UseSelectionSelector<T>): void => {
    setOptions((prev) => {
      return prev.select(selector);
    });
    console.log('Set');
  }, []);
  const add = useCallback((newoptions: T | T[]): void => {
    setOptions((prev) => {
      return prev.add(newoptions);
    });
  }, []);
  const remove = useCallback((selector: UseSelectionSelector<T>): void => {
    setOptions((prev) => {
      return prev.remove(selector);
    });
  }, []);

  useEffect(() => {
    console.log('Rerendered', options);
  }, [options]);

  return {
    all: options,
    options: options.options,
    selected: options.selected,
    actions: {
      set,
      select,
      add,
      remove,
    },
  };
};

export default useSelection;
