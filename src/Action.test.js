/* eslint-env mocha */
import expect, { createSpy } from 'expect';

import Action from './Action';

describe('Action', () => {
  let type, reducer;

  beforeEach(() => {
    type = 'DEPLOY_MISSILES';
    reducer = (state) => state;
  });

  it('contains the action type', () => {
    const type = 'MY_ACTION';
    const action = Action(type, {reducer});

    expect(action.type).toBe(type);
  });

  it('contains the reducer', () => {
    const reducer = () => {};
    const action = Action(type, {reducer});

    expect(action.reducer).toBe(reducer);
  });

  it('contains the scope selector', () => {
    const scope = () => {};
    const action = Action(type, {scope, reducer});

    expect(action.scope).toBe(scope);
  });

  it('returns an action creator', () => {
    const action = Action(type, {reducer});

    expect(action()).toContain({type});
  });

  it('passes the creator all arguments', () => {
    const creator = createSpy();
    const action = Action(type, {creator, reducer});
    const args = ['spy', 'args'];
    action(...args);

    expect(creator).toHaveBeenCalled();
    expect(creator).toHaveBeenCalledWith(...args);
  });

  it('throws if no options are passed', () => {
    expect(() => Action(type)).toThrow();
  });

  it('spreads the first argument if no creator is given', () => {
    const action = Action(type, {reducer});
    const value = {
      field1: 'yeah',
      field2: 'mostly',
    };

    expect(action(value)).toContain(value);
  });

  it('throws if the reducer is not a function', () => {
    expect(() => Action(type, {})).toThrow(/reducer/);
  });
});
