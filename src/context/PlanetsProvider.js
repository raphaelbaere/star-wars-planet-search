import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePlanets from '../hooks/usePlanets';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { isLoading, errors, makeFetch } = usePlanets();
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [originalPlanets, setOriginalPlanets] = useState([]);

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

  useEffect(() => {
    const getPlanets = async (url) => {
      const planetsAPI = await makeFetch(url);
      setPlanets(planetsAPI);
      setOriginalPlanets(planetsAPI);
    };
    getPlanets('https://swapi.dev/api/planets');
  }, []);
  const values = useMemo(() => ({
    planets, isLoading, errors, search, onInputChange,
  }), [planets, isLoading, errors, search]);
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
