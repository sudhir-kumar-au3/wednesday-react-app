import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNE', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ITUNE,
      ituneName: 'ituneName'
    };
    expect(homeContainerCreators.requestGetItune('ituneName')).toEqual(
      expected
    );
  });
});
