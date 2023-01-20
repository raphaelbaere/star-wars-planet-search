import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePlanets from '../hooks/usePlanets';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, makeFetch } = usePlanets();
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const [searchColumn, setSearchColumn] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

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

  const onFilterButtonClick = () => {
    if (valueFilter) {
      switch (comparisonFilter) {
      case 'maior que':
        setPlanets(filterPlanetsBiggerThan());
        break;
      case 'menor que':
        setPlanets(filterPlanetsLessThan());
        break;
      case 'igual a':
        setPlanets(filterPlanetsEquals());
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
  }), [planets, isLoading, errors, search, searchColumn, comparisonFilter, valueFilter]);
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
