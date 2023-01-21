import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ColumnSort() {
  const { values: { sortOrder: { order: { column } }, onSortSelectChange,
    optionsArray } } = useContext(PlanetsContext);

  const showOptions = () => optionsArray.map((option, index) => (
    <option key={ index } value={ option }>{option}</option>
  ));
  return (
    <label htmlFor="planet-sort-select">
      Ordenar
      <select
        id="planet-sort-select"
        data-testid="column-sort"
        name="planet-sort-select"
        value={ column }
        onChange={ onSortSelectChange }
      >
        {showOptions()}
      </select>
    </label>
  );
}
