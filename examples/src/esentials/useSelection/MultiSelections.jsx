import useSelection from '../../../../src/hooks/useSelection';

const MultiSelections = () => {
  const {
    options,
    selected,
    actions: { set, select, add, remove },
  } = useSelection(['Option 1', 'Option 2', 'Option 3'], {
    allowMultiple: true,
    toggleSelected: true,
  });

  const selectOption = (e) => {
    select(e.currentTarget.value);
  };

  const isSelected = (option) => {
    return selected.includes(option);
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Multi Selections</div>{' '}
      {options.map((option, index) => {
        return (
          <div className="flex items-center mb-4" key={index.toString()}>
            <input
              id={`checkbox-${index}`}
              type="checkbox"
              name="checkbox"
              value={option}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby={`checkbox-${index}`}
              aria-describedby={`checkbox-${index}`}
              checked={isSelected(option)}
              onChange={selectOption}
            />
            <label htmlFor={`checkbox-${index}`} className="text-sm font-medium text-gray-900 ml-2 block">
              {option}
            </label>
          </div>
        );
      })}
      <div>{`Currently Selected: ${(selected || []).join(', ')}`}</div>
    </div>
  );
};

export default MultiSelections;
