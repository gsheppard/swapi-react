import fetch from 'isomorphic-fetch';

export const REQUEST_PEOPLE = 'REQUEST_PERSONS';
export const RECEIVE_PEOPLE = 'RECEIVE_PERSONS';
export const UPDATE_SRC = 'UPDATE_SRC';

function updateSrcString(searchStr) {
  return {
    type: UPDATE_SRC,
    searchStr,
  };
}

function requestPeople(searchStr) {
  return {
    type: REQUEST_PEOPLE,
    searchStr,
  };
}

function receivePeople(searchStr, json) {
  return {
    type: RECEIVE_PEOPLE,
    searchStr,
    people: json.results.map(person => ({
      name: person.name,
      gender: person.gender,
      skin_color: person.skin_color,
      hair_color: person.hair_color,
      eye_color: person.eye_color,
      height: person.height,
      mass: person.mass,
    })),
    receivedAt: Date.now(),
  };
}

function fetchPeople(searchStr) {
  return (dispatch) => {
    dispatch(updateSrcString(searchStr));
    dispatch(requestPeople(searchStr));
    return fetch(`https://swapi.co/api/people/?search=${searchStr}`)
      .then(response => response.json())
      .then(json => dispatch(receivePeople(searchStr, json)));
  };
}

function shouldFetchPeople(state, searchStr) {
  const posts = state.personsBySearchString[searchStr];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return false;
}

export function fetchPeopleIfNeeded(searchStr) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), searchStr)) {
      return dispatch(fetchPeople(searchStr));
    }
    return dispatch(updateSrcString(searchStr));
  };
}
