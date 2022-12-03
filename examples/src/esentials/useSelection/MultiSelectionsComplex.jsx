import useSelection from '../../../../src/hooks/useSelection';

const MultiSelectionsComplex = () => {
  const {
    all,
    options,
    selected,
    actions: { set, select, add, remove },
  } = useSelection(
    [
      {
        id: 2,
        name: 'Pam',
        age: 23,
      },
      {
        id: 2,
        name: 'Sly',
        age: 25,
      },
      {
        id: 3,
        name: 'Joe',
        age: 24,
      },
    ],
    {
      allowMultiple: true,
      toggleSelected: true,
    },
  );

  const selectOption = (e) => {
    select({ id: currentTarget.value });
  };

  const isSelected = (option) => {
    console.log(all);
    selected.find((eachSelected) => {
      console.log('?', option.id);
      eachSelected.id == option.id;
    });
    return false;
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Multi Selections with complext data</div>{' '}
      {options.map((option, index) => {
        return (
          <div className="flex items-center mb-4" key={index.toString()}>
            <input
              id={`checkbox-multy-${index}`}
              type="checkbox"
              name="checkbox-multy"
              value={option.id}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby={`checkbox-multy-${index}`}
              aria-describedby={`checkbox-multy-${index}`}
              checked={isSelected(option)}
              onChange={selectOption}
            />
            <label htmlFor={`checkbox-multy-${index}`} className="text-sm font-medium text-gray-900 ml-2 block">
              {option.name}
            </label>
          </div>
        );
      })}
      <div>{`Currently Selected: ${(
        selected.map((eachSelected) => {
          return `{name: ${eachSelected.name}, age: ${eachSelected.age}}`;
        }) || []
      ).join(', ')}`}</div>
    </div>
  );
};

export default MultiSelectionsComplex;
