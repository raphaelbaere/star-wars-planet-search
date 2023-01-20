import React from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <PlanetsProvider>
        <SearchInput />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
