/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetItune: ['ituneName'],
  successGetItune: ['data'],
  failureGetItune: ['error'],
  clearItune: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_ITUNE:
        return initialState.set('ituneName', action.ituneName);
      case homeContainerTypes.CLEAR_ITUNE:
        return initialState.set('ituneName', null).set('ituneData', null);
      case homeContainerTypes.SUCCESS_GET_ITUNE:
        return state.set('ituneData', action.data);
      case homeContainerTypes.FAILURE_GET_ITUNE:
        return state.set(
          'ituneError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default homeContainerReducer;
