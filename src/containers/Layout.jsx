import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItemsIfNeeded } from '../actions/items';
import Search from '../components/Search';
import Results from '../components/Results';
import Loader from '../components/Loader';
import Logo from '../components/Logo';

import './layout.scss';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }

  handleChange = (searchStr) => {
    this.props.dispatch(fetchItemsIfNeeded(searchStr));
  }

  render() {
    const { searchStr, items, isFetching } = this.props;
    return (
      <div className='container'>
        <header className='header'>
          <Logo />
          <Search
            value={searchStr}
            onChange={this.handleChange}
          />
        </header>
        <section className='content'>
          {isFetching && items.length === 0 &&
            <Loader />
          }
          {!isFetching && items.length === 0 &&
            <h2>No Results</h2>
          }
          {items.length > 0 &&
            <Results items={items} />
          }
        </section>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  searchStr: PropTypes.string,
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
  };
}

export default connect(mapStateToProps)(AsyncApp);
