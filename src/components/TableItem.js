import React from 'react';
import PropTypes from 'prop-types';

export default function TableItem(props) {
  const { planetInfos } = props;
  const planetValues = Object.values(planetInfos);
  const createPlanetTD = (infos) => infos.map((info, index) => (
    <td data-testid={ index === 0 ? 'planet-name' : '' } key={ index }>
      {info}
    </td>
  ));
  return (
    <tr>
      {createPlanetTD(planetValues)}
    </tr>
  );
}

TableItem.propTypes = {
  planetInfos: PropTypes.arrayOf().isRequired,
};
