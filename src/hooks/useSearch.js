import { useState } from 'react';

export default function usePlanet() {
  const [search, setSearch] = useState('');

  const onInputChange = ({ target }) => {
    setSearch(target.value);
  };

  return ({
    onInputChange, search,
  });
}
