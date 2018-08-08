import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import icon from './images/search.svg';
import { fetchItemsIfNeeded } from '../../actions/items';

import './search.scss';

class Search extends Component {
  handleChange = (e) => {
    this.props.fetchItemsIfNeeded(e.target.value);
  }

  render() {
    const { value } = this.props;

    return (
      <div className='search'>
        <div className='search__title'>Search by</div>
        <div className='search__subtitle'>Films, Characters, Species, Starships & Planets</div>
        <div className='search__input'>
          <div
            className='search__icon'
            dangerouslySetInnerHTML={{ __html: icon }}
          />
          <input
            type='text'
            placeholder='Enter a search term'
            onChange={this.handleChange}
            value={value}
            autoFocus
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    searchStr: state.searchStr,
  };
}

const mapDispatchToProps = {
  fetchItemsIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
