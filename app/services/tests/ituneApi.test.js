import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItune } from '../ituneApi';

describe('ituneApi tests', () => {
  const searchTerm = 'kesha';
  it('should make the api call to "/search/?term=""', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ searchTerm }]
      }
    ];
    mock.onGet(`/search?term=${searchTerm}`).reply(200, data);
    const res = await getItune(searchTerm);
    expect(res.data).toEqual(data);
  });
});
