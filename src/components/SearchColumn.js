import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SearchColumn() {
  const { values: { searchColumn, onSelectChange } } = useContext(PlanetsContext);
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
    </label>
  );
}
