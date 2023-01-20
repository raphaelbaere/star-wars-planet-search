import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ComparisonFilter() {
  const { values: { comparisonFilter,
    onSelectChange, setComparisonFilter } } = useContext(PlanetsContext);
  return (
    <label htmlFor="planet-comparison-filter-select">
      Operador
      <select
        id="planet-comparison-filter-select"
        data-testid="comparison-filter"
        name="planet-comparison-filter-select"
        value={ comparisonFilter }
        onChange={ (e) => { onSelectChange(e, setComparisonFilter); } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    </label>
  );
}
