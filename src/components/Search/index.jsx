import React, { PropTypes } from 'react';
import './search.scss';

const Search = (props) => {
  const { value, onChange } = props;

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="enter a search term"
        onChange={e => onChange(e.target.value)}
        value={value}
        autoFocus
      />
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
