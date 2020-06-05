import {
  homeContainerReducer,
  initialState,
  homeContainerTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const ituneName = 'kesha';
    const expectedResult = state.set('ituneName', ituneName);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_ITUNE,
        ituneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'kesha' };
    const expectedResult = state.set('ituneData', data);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_ITUNE,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('ituneError', error);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_ITUNE,
        error
      })
    ).toEqual(expectedResult);
  });
});
