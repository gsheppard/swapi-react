import { combineReducers } from 'redux';
import { REQUEST_PEOPLE, RECEIVE_PEOPLE, UPDATE_SRC } from '../actions/people';

function searchStr(state = '', action) {
  switch (action.type) {
    case UPDATE_SRC:
      return action.searchStr;
    default:
      return state;
  }
}

function persons(state = {
  isFetching: false,
  searchStr: '',
  people: []
}, action) {
  switch (action.type) {
    case REQUEST_PEOPLE:
      return Object.assign({}, state, {
        searchStr: action.searchStr,
        isFetching: true
      });
    case RECEIVE_PEOPLE:
      return Object.assign({}, state, {
        isFetching: false,
        people: action.people,
      });
    default:
      return state;
  }
}

function personsBySearchString(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PEOPLE:
    case REQUEST_PEOPLE:
      return Object.assign({}, state, {
        [action.searchStr]: persons(state[action.searchStr], action)
      });
    default:
      return state;
  }
}

export default combineReducers({
  personsBySearchString,
  searchStr
});
