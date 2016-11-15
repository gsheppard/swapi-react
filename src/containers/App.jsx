import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPeopleIfNeeded } from '../actions/people';
import Search from '../components/Search';
import Results from '../components/Results';
import Loader from '../components/Loader';

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
    const { searchStr, people, isFetching } = this.props;
    return (
      <div>
        <h1>Star Wars Character Search</h1>
        <Search value={searchStr} onChange={this.handleChange} />
        {isFetching && people.length === 0 &&
          <Loader />
        }
        {!isFetching && people.length === 0 &&
          <h2>No Results</h2>
        }
        {people.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Results people={people} />
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
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { searchStr, personsBySearchString } = state;
  const { isFetching, people } = personsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    people: []
  };

  return {
    searchStr,
    people,
    isFetching
  };
}

export default connect(mapStateToProps)(AsyncApp);
