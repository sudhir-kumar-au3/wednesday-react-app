/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getItune } from '@app/services/ituneApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItuneName } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const ituneName = 'kesha';
  let getItuneNameGenerator = getItuneName({ ituneName });

  it('should start task to watch for REQUEST_GET_ITUNE action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(homeContainerTypes.REQUEST_GET_ITUNE, getItuneName)
    );
  });

  it('should ensure that the action FAILURE_GET_ITUNE is dispatched when the api call fails', () => {
    const res = getItuneNameGenerator.next().value;
    expect(res).toEqual(call(getItune, ituneName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(
      getItuneNameGenerator.next(apiResponseGenerator(false, errorResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ITUNE,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE is dispatched when the api call succeeds', () => {
    getItuneNameGenerator = getItuneName({ ituneName });
    const res = getItuneNameGenerator.next().value;
    expect(res).toEqual(call(getItune, ituneName));
    const ituneResponse = {
      totalCount: 1,
      items: [{ ituneArtistName: ituneName }]
    };
    expect(
      getItuneNameGenerator.next(apiResponseGenerator(true, ituneResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ITUNE,
        data: ituneResponse
      })
    );
  });
});
