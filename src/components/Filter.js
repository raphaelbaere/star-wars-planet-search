import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import ComparisonFilter from './ComparisonFilter';
import SearchColumn from './SearchColumn';
import SearchInput from './SearchInput';
import ValueFilter from './ValueFilter';
import '../App.css';

export default function Filter() {
  const { values: { onFilterButtonClick,
    arrayOfFilters, filterRemoveButtonClick,
    removeAllFilters } } = useContext(PlanetsContext);

  const showArrayOfFilters = () => arrayOfFilters.map((filter, index) => (
    <div
      key={ index }
      data-testid="filter"
    >
      <p>
        {filter.searchColumn}
        {filter.valueFilter}
        {filter.comparisonFilter}
      </p>
      <button
        type="button"
        data-testid={ `remove-filter${index}` }
        onClick={ () => { filterRemoveButtonClick(filter.searchColumn); } }
      >
        Remover
      </button>
    </div>
  ));
  return (
    <div className="filter">
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
      {showArrayOfFilters()}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}
