import { fromJS } from 'immutable';
import {
  selectHomeContainer,
  selectItuneName,
  selectItuneData,
  selectItuneError
} from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let ituneName;
  let ituneData;
  let ituneError;

  beforeEach(() => {
    ituneName = 'kesha';
    ituneData = { totalCount: 1, items: [{ ituneName }] };
    ituneError = 'There was some error while fetching the details';

    mockedState = {
      homeContainer: fromJS({
        ituneName,
        ituneData,
        ituneError
      })
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(
      mockedState.homeContainer.toJS()
    );
  });
  it('should select the ituneName', () => {
    const ituneSelector = selectItuneName();
    expect(ituneSelector(mockedState)).toEqual(ituneName);
  });

  it('should select ituneData', () => {
    const ituneDataSelector = selectItuneData();
    expect(ituneDataSelector(mockedState)).toEqual(ituneData);
  });

  it('should select the ituneError', () => {
    const ituneErrorSelector = selectItuneError();
    expect(ituneErrorSelector(mockedState)).toEqual(ituneError);
  });
});
