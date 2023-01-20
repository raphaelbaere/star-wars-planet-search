import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function usePlanet() {
  const { planets } = useContext(PlanetsContext);
  const [search, setSearch] = useState('');

  const onInputChange = ({ target }) => {
    setSearch(target.value);
  };

  return ({
    onInputChange, search,
  });
}
