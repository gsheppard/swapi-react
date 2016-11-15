import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPeopleIfNeeded } from '../actions/people';
import Search from '../components/Search';
import PeopleList from '../components/PeopleList';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchPeopleIfNeeded(searchStr));
  }

  handleChange(searchStr) {
    this.props.dispatch(fetchPeopleIfNeeded(searchStr));
  }

  render() {
    const { searchStr, people, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <h1>Star Wars Character Search</h1>
        <Search value={searchStr} onChange={this.handleChange} />
        <p>
          {lastUpdated &&
            <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
          }
        </p>
        {isFetching && people.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && people.length === 0 &&
          <h2>Nothing to show yet</h2>
        }
        {people.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <PeopleList people={people} />
          </div>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  searchStr: PropTypes.string,
  people: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { searchStr, personsBySearchString } = state;
  const { isFetching, lastUpdated, people } = personsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    people: []
  };

  return {
    searchStr,
    people,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
