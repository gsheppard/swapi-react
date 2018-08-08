import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import itemReducer from './reducers/items';

const logger = createLogger({ collapsed: true });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, logger)
);

export default function configureStore(preloadedState) {
  return createStore(
    itemReducer,
    preloadedState,
    enhancer
  );
}
