/* eslint-env mocha */
import expect, { createSpy } from 'expect';

import Reducer from './Reducer';
import Action from './Action';

describe('Reducer', () => {
  let reducer, action, noop;

  beforeEach(() => {
    noop = Action('FOREIGN_TO_REDUCER', {
      reducer: (state) => state,
    });

    action = Action('COOK_MACARONI', {
      reducer: createSpy(),
    });

    reducer = Reducer([action]);
  });

  it('is a function', () => {
    expect(Reducer).toBeA(Function);
  });

  it('returns a function', () => {
    expect(reducer).toBeA(Function);
  });

  it('throws if no input is given', () => {
    expect(Reducer).toThrow();
  });

  it('throws if only an action is passed', () => {
    expect(() => Reducer(action)).toThrow(/action/);
  });

  it('works with objects of actions', () => {
    const actionsObject = () => Reducer({ cookMacaroni: action });

    expect(actionsObject).toNotThrow();
  });

  it('throws if there are duplicate action types', () => {
    const fail = () => Reducer([action, action]);

    expect(fail).toThrow(new RegExp(action.type));
  });

  describe('instance', () => {
    let state;

    beforeEach(() => {
      state = {messages: {}};
    });

    it('returns the state if no action matches', () => {
      const result = reducer(state, noop);

      expect(result).toBe(state);
    });

    it('uses the known reducer if the type matches', () => {
      reducer(state, action());

      expect(action.reducer).toHaveBeenCalled();
      expect(action.reducer).toHaveBeenCalledWith(state, action());
    });

    it('returns the reduced state', () => {
      action.reducer.andReturn(5);
      const result = reducer(state, action());

      expect(result).toBe(5);
    });
  });
});
