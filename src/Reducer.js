/**
 * Asserts the reducer was given actions.
 * @param  {Any} value - The actions which should be defined.
 * @throws {TypeError}
 * @return {undefined}
 */
const assertHasActions = (value) => {
  if (!value) {
    throw new TypeError(
      `Reducer(...) expects actions, was given "${value}"`
    );
  }
};

/**
 * Asserts the reducer was not given a single action.
 * @param  {Any} value - A value you expect to not be an Action.
 * @throws {TypeError}
 * @return {undefined}
 */
const assertIsNotSingleAction = (value) => {
  if (value.type && value.reducer) {
    throw new TypeError(
      'Reducer(...) expects actions to be in a collection.'
    );
  }
};

/**
 * Turns a collection of actions into a reducer map.
 * @param  {Object|Array} actions - Collection of actions.
 * @return {Object} - Reducers mapped by their types.
 */
const createReducerMap = (actions) => {
  const map = {};

  // Allow interop with objects of actions.
  Object.keys(actions).forEach((key) => {
    const action = actions[key];

    map[action.type] = action.reducer;
  });

  return map;
};

/**
 * Asserts the reducer was given actions.
 * @param  {Object|Array} actions - A collection of actions.
 * @return {Function} - Redux reducer.
 */
export default (actions) => {
  assertHasActions(actions);
  assertIsNotSingleAction(actions);

  // Turn the collection of actions into a type map.
  const reducers = createReducerMap(actions);

  return (state, action) => {
    const reducer = reducers[action.type];

    // No matching reducer.
    if (!reducer) {
      return state;
    }

    return reducer(state, action);
  };
};
