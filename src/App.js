import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import Filter from './components/Filter';
import Sort from './components/Sort';

function App() {
  return (
    <div className="background">
      <PlanetsProvider>
        <main className="main-content">
          <h1>Projeto Star Wars - Trybe</h1>
          <Filter />
          <Sort />
          <Table />
        </main>
      </PlanetsProvider>
    </div>
  );
}

export default App;
