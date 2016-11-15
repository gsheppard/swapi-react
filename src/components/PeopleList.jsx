import React, { PropTypes } from 'react';

const Posts = props => (
  <ul>
    {props.people.map((people, i) =>
      <li key={i}>{people.name}</li>
    )}
  </ul>
);

Posts.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Posts;
