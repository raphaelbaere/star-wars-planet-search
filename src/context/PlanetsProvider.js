import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePlanets from '../hooks/usePlanets';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const optionsArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const { isLoading, errors, makeFetch } = usePlanets();
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [arrayOptions, setArrayOptions] = useState(optionsArray);
  const [searchColumn, setSearchColumn] = useState(arrayOptions[0]);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);

  const onValueFilterChange = ({ target: { value } }) => {
    setValueFilter(value);
  };

  const onInputChange = ({ target: { value } }) => {
    setSearch(value);
    if (value.length > 0) {
      const planetsFiltered = planets.filter((planet) => (
        planet.name.toUpperCase().includes(value.toUpperCase())));
      setPlanets(planetsFiltered);
    } else {
      setPlanets(originalPlanets);
    }
  };

  const onSelectChange = ({ target: { value } }, optional) => {
    if (optional) {
      optional(value);
      return;
    }
    setSearchColumn(value);
  };

  const filterPlanetsBiggerThan = (column, value) => {
    if (column && value) {
      const planetsFiltered = originalPlanets.filter((planet) => (
        +planet[column] > +value
      ));
      setPlanets(planetsFiltered);
      return planetsFiltered;
    }
    const planetsFiltered = planets.filter((planet) => (
      +planet[searchColumn] > +valueFilter
    ));
    return planetsFiltered;
  };

  const filterPlanetsLessThan = (column, value) => {
    if (column && value) {
      const planetsFiltered = originalPlanets.filter((planet) => (
        +planet[column] < +value
      ));
      return planetsFiltered;
    }
    const planetsFiltered = planets.filter((planet) => (
      +planet[searchColumn] < +valueFilter
    ));
    return planetsFiltered;
  };

  const filterPlanetsEquals = (column, value) => {
    if (column && value) {
      const planetsFiltered = originalPlanets.filter((planet) => (
        +planet[column] === +value
      ));
      return planetsFiltered;
    }
    const planetsFiltered = planets.filter((planet) => (
      +planet[searchColumn] === +valueFilter
    ));
    return planetsFiltered;
  };

  const filterArrayOptions = () => {
    const optionsFiltered = arrayOptions.filter((option) => (
      option !== searchColumn
    ));
    setArrayOptions(optionsFiltered);
    setSearchColumn(optionsFiltered[0]);
  };

  const refilter = (comparison, value, column) => {
    if (value) {
      switch (comparison) {
      case 'maior que':
        setPlanets(filterPlanetsBiggerThan(column, value));
        break;
      case 'menor que':
        setPlanets(filterPlanetsLessThan(column, value));
        break;
      case 'igual a':
        setPlanets(filterPlanetsEquals(column, value));
        break;
      default:
        break;
      }
    }
  };

  const removeAllFilters = () => {
    setPlanets(originalPlanets);
    setArrayOfFilters([]);
    setArrayOptions(optionsArray);
  };

  const filterRemoveButtonClick = (coluna) => {
    const filtersFiltered = arrayOfFilters.filter((filter) => (
      filter.searchColumn !== coluna
    ));
    setArrayOfFilters(filtersFiltered);
    setArrayOptions([...arrayOptions, coluna]);
    if (filtersFiltered.length === 0) {
      setPlanets(originalPlanets);
      return;
    }
    filtersFiltered.forEach((filter) => {
      refilter(filter.comparisonFilter, filter.valueFilter, filter.searchColumn);
    });
  };

  const onFilterButtonClick = () => {
    const filterObject = {
      comparisonFilter,
      valueFilter,
      searchColumn,
    };

    setArrayOfFilters([...arrayOfFilters, filterObject]);
    if (valueFilter) {
      switch (comparisonFilter) {
      case 'maior que':
        setPlanets(filterPlanetsBiggerThan());
        filterArrayOptions();
        break;
      case 'menor que':
        setPlanets(filterPlanetsLessThan());
        filterArrayOptions();
        break;
      case 'igual a':
        setPlanets(filterPlanetsEquals());
        filterArrayOptions();
        break;
      default:
        break;
      }
    }
  };

  useEffect(() => {
    const getPlanets = async (url) => {
      const planetsAPI = await makeFetch(url);
      setPlanets(planetsAPI);
      setOriginalPlanets(planetsAPI);
    };
    getPlanets('https://swapi.dev/api/planets');
  }, []);
  const values = useMemo(() => ({
    planets,
    isLoading,
    errors,
    search,
    onInputChange,
    searchColumn,
    onSelectChange,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    onValueFilterChange,
    onFilterButtonClick,
    arrayOptions,
    arrayOfFilters,
    filterRemoveButtonClick,
    removeAllFilters,
  }), [planets, isLoading, errors, search, searchColumn,
    comparisonFilter, valueFilter, arrayOptions, arrayOfFilters]);
  return (
    <PlanetsContext.Provider
      value={ { values } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default PlanetsProvider;
