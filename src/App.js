import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import Filter from './components/Filter';

function App() {
  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <PlanetsProvider>
        <Filter />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
