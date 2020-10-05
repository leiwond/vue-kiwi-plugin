import { Model as BaseModel } from 'vue-api-query';

export default class Model extends BaseModel {
  parameterNames() {
    return {
      page: 'page[number]',
      limit: 'page[size]',
      include: 'include',
      filter: 'filter',
      sort: 'sort',
      fields: 'fields',
      append: 'append',
    };
  }

  baseURL() {
    return process.env.VUE_APP_API_SALES_PROCESS_BASE_URL;
  }

  request(config) {
    super.$http.defaults.headers['api-token'] = process.env.VUE_APP_API_SALES_PROCESS_TOKEN;
    super.$http.defaults.headers['platform-id'] = 1;
    const token: string|null = localStorage.getItem('auth-token');
    if (token) {
      super.$http.defaults.headers.authorization = `Bearer ${token}`;
    }
    return super.$http.request(config);
  }

  get httpClient() {
    return super.$http;
  }
}
