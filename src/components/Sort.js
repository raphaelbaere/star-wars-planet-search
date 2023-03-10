import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import ColumnSort from './ColumnSort';
import SortInputs from './SortInputs';
import '../App.css';

export default function Sort() {
  const { values: { onSortButtonClick } } = useContext(PlanetsContext);
  return (
    <div className="sort">
      <ColumnSort />
      <SortInputs />
      <button
        data-testid="column-sort-button"
        id="column-sort-button"
        type="button"
        onClick={ onSortButtonClick }
      >
        Ordenar
      </button>
    </div>
  );
}
