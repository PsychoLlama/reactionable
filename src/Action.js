const spreadPayload = (payload = {}) => ({...payload});

/**
 * Throws if config is not an object.
 * @param  {Any} value - The config.
 * @throws {TypeError}
 * @return {undefined}
 */
const assertIsObject = (value) => {
  if (!(value instanceof Object)) {
    throw new TypeError(
      `Action(...) expected a config object, was given "${value}"`
    );
  }
};

/**
 * Throws if the reducer is not a function.
 * @param  {Any} value - The config.
 * @throws {TypeError}
 * @return {undefined}
 */
const assertIsReducer = (value) => {
  if (typeof value !== 'function') {
    throw new TypeError(
      `Action(...) expected a reducer, was given "${value}"`
    );
  }
};

/**
 * Action factory.
 * @param  {String} type - The type of action being dispatched.
 * @param  {Object} config - Action configuration.
 * @param  {Function} config.creator - Action creator (type implied).
 * @param  {Function} config.reducer - Coupled state reducer.
 * @param  {Function} [config.scope] - Selects state (scope) for the reducer.
 * @return {Function} - Action creator.
 */
export default (type, config) => {
  assertIsObject(config);

  const {reducer, scope, creator = spreadPayload} = config;
  assertIsReducer(reducer);

  const action = (...args) => ({
    ...creator(...args),
    type,
  });

  // For consumption by `Reducer`.
  action.type = type;
  action.reducer = reducer;
  action.scope = scope;

  return action;
};
