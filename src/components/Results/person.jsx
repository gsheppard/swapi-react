import React, { PropTypes } from 'react';

const Person = props => (
  <li className="results__item">
    <h3 className="results__title">{props.entry.name}</h3>
    <ul className="results__info">
      <li>Gender: {props.entry.gender}</li>
      <li>Skin Colour: {props.entry.skin_color}</li>
      <li>Hair Colour: {props.entry.hair_color}</li>
      <li>Eye Colour: {props.entry.eye_color}</li>
      <li>Height: {props.entry.height}cm</li>
      <li>Weight: {props.entry.mass}kg</li>
    </ul>
  </li>
);

Person.propTypes = {
  entry: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string,
    skin_color: PropTypes.string,
    hair_color: PropTypes.string,
    eye_color: PropTypes.string,
    height: PropTypes.string,
    mass: PropTypes.string,
  }),
};

export default Person;
