import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SearchColumn() {
  const { values: { searchColumn, onSelectChange,
    arrayOptions } } = useContext(PlanetsContext);

  const showOptions = () => arrayOptions.map((option, index) => (
    <option key={ index } value={ option }>{option}</option>
  ));
  return (
    <label htmlFor="planet-filter-select">
      Coluna
      <select
        id="planet-filter-select"
        data-testid="column-filter"
        name="planet-filter-select"
        value={ searchColumn }
        onChange={ onSelectChange }
      >
        {showOptions()}
      </select>
    </label>
  );
}
