import React, { PropTypes } from 'react';

const Search = (props) => {
  const { value, onChange } = props;

  return (
    <span>
      <input
        type="text"
        placeholder="enter a search term"
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    </span>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
