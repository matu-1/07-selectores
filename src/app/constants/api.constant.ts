export const API_URL = 'https://restcountries.com/v2';
export const API = {
  PAIS: {
    GET_BY_REGION: `${API_URL}/region/:region?fields=name,alpha3Code`,
    GET_BY_CODE: `${API_URL}/alpha/:code`,
    GET_BY_CODE_SMALL: `${API_URL}/alpha/:code?fields=name,alpha3Code`,
  },
};

export function routeParams(route: string, params: { [key: string]: string }) {
  Object.keys(params).forEach((key) => {
    route = route.replace(`:${key}`, params[key]);
  });
  return route;
}
