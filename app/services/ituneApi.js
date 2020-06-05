import { generateApiClient } from '@utils/apiUtils';
const ituneApi = generateApiClient('itune');

export const getItune = searchTerm =>
  ituneApi.get(`/search?term=${searchTerm}`);
