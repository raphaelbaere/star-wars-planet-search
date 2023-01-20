import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ValueFilter() {
  const { values: { valueFilter,
    onValueFilterChange } } = useContext(PlanetsContext);
  return (
    <label htmlFor="planet-value-filter-select">
      <input
        id="planet-value-filter-select"
        type="number"
        data-testid="value-filter"
        name="planet-value-filter-select"
        value={ valueFilter }
        onChange={ onValueFilterChange }
      />
    </label>
  );
}
