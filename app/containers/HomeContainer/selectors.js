import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state =>
  (state.homeContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectItuneData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'ituneData', null)
  );

export const selectItuneError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'ituneError', null)
  );

export const selectItuneName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'ituneName', null)
  );

export default selectHomeContainer;
