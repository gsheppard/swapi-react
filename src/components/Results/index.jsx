import React, { PropTypes } from 'react';

import Person from './person.jsx';

import './results.scss';

const Results = props => (
  <ul className="results">
    {props.people.map((person, i) =>
      <Person key={i} entry={person} />
    )}
  </ul>
);

Results.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Results;
