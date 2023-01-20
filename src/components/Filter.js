import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import ComparisonFilter from './ComparisonFilter';
import SearchColumn from './SearchColumn';
import SearchInput from './SearchInput';
import ValueFilter from './ValueFilter';

export default function Filter() {
  const { values: { onFilterButtonClick } } = useContext(PlanetsContext);
  return (
    <div>
      <SearchInput />
      <SearchColumn />
      <ComparisonFilter />
      <ValueFilter />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ onFilterButtonClick }
      >
        Filtrar
      </button>
    </div>
  );
}
