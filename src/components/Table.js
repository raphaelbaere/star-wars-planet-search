import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableItem from './TableItem';

export default function Table() {
  const { values: { isLoading, planets, errors } } = useContext(PlanetsContext);

  const createTableTh = () => {
    const planetKeys = Object.keys(planets[0]);
    return planetKeys.map((planetKey, index) => (
      <th key={ index }>
        {planetKey}
      </th>
    ));
  };

  return (
    <div>
      {isLoading ? <p>Carregando</p> : ''}
      {errors ? <p>{errors}</p> : ''}
      <table>
        <thead>
          <tr>
            {planets.length > 0 && createTableTh()}
          </tr>
        </thead>
        <tbody>
          {planets.length > 0 && planets.map((planet, index) => (
            <TableItem key={ index } planetInfos={ planet } />
          ))}
        </tbody>
      </table>
    </div>
  );
}
