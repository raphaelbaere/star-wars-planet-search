import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import usePlanets from './hooks/usePlanets';

function App() {
  const { isLoading, errors, makeFetch } = usePlanets();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async (url) => {
      const planetsAPI = await makeFetch(url);
      setPlanets(planetsAPI);
    };
    getPlanets('https://swapi.dev/api/planets');
  }, []);
  const values = useMemo(() => ({
    planets, isLoading, errors,
  }), [planets, isLoading, errors]);
  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <PlanetsContext.Provider value={ { values } }>
        <Table />
      </PlanetsContext.Provider>
    </div>
  );
}

export default App;
