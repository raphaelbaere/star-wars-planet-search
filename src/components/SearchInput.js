import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SearchInput() {
  const { values: { search, onInputChange } } = useContext(PlanetsContext);
  return (
    <label htmlFor="planet-search-input">
      <input
        id="planet-search-input"
        type="text"
        data-testid="name-filter"
        name="planet-search"
        value={ search }
        onChange={ onInputChange }
      />
    </label>
  );
}
