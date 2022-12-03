import useSelection from '../../../../src/hooks/useSelection';

const SingleSelection = () => {
  const {
    options,
    selected,
    actions: { set, select, add, remove },
  } = useSelection(['Option 1', 'Option 2', 'Option 3']);

  const selectOption = (e) => {
    select(e.currentTarget.value);
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Single Selections</div>{' '}
      {options.map((option, index) => {
        return (
          <div className="flex items-center mb-4" key={index.toString()}>
            <input
              id={`radio-${index}`}
              type="radio"
              name="radio"
              value={option}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby={`radio-${index}`}
              aria-describedby={`radio-${index}`}
              onChange={selectOption}
            />
            <label htmlFor={`radio-${index}`} className="text-sm font-medium text-gray-900 ml-2 block">
              {option}
            </label>
          </div>
        );
      })}
      <div>{`Currently Selected: ${selected[0] || 'none'}`}</div>
    </div>
  );
};

export default SingleSelection;
