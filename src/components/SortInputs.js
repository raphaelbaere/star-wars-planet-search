import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SortInputs() {
  const { values: { onInputSortChange,
    sortOrder: { order: { sort } } } } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="column-sort-input-asc">
        Ascendente
        <input
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          name="sort-inputs"
          type="radio"
          value="ASC"
          checked={ sort === 'ASC' }
          onChange={ onInputSortChange }
        />
      </label>
      <label htmlFor="column-sort-input-asc">
        Descendente
        <input
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          name="sort-inputs"
          type="radio"
          checked={ sort === 'DESC' }
          value="DESC"
          onChange={ onInputSortChange }
        />
      </label>
    </div>
  );
}
