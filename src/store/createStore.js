import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux';

export default (reducers, middlewares) => {
  const enhancer = __DEV__
    ? compose(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
