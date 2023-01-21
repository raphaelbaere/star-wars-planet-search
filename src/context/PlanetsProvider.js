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

  const filterPlanetsBiggerThan = () => {
    const planetsFiltered = planets.filter((planet) => (
      +planet[searchColumn] > +valueFilter
    ));
    return planetsFiltered;
  };

  const filterPlanetsLessThan = () => {
    const planetsFiltered = planets.filter((planet) => (
      +planet[searchColumn] < +valueFilter
    ));
    return planetsFiltered;
  };

  const filterPlanetsEquals = () => {
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

  const onFilterButtonClick = () => {
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
  }), [planets, isLoading, errors, search, searchColumn,
    comparisonFilter, valueFilter, arrayOptions]);
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
