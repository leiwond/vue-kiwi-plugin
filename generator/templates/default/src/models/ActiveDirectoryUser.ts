import Model from './Model';

export default class ActiveDirectoryUser extends Model {
  attributes: any

  baseURL() {
    return process.env.VUE_APP_API_SERVICE_BASE_URL;
  }

  resource() {
    return 'active-directory-users';
  }

  request(config) {
    super.httpClient.defaults.headers['api-token'] = process.env.VUE_APP_API_SERVICE_TOKEN;
    return super.request(config);
  }

  get fullName() {
    return `${this.attributes.firstName} ${this.attributes.lastName}`;
  }
}
