import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

export const ApiService = {

  get(action, config) {
    return axios.get(config.endpoint + action, this.getAuthHeaders());
  },

  post(action, data, config){
    return axios.post(config.endpoint + action, data, this.getAuthHeaders());
  },

  del(action, config) {
    return axios.delete(config.endpoint + action, this.getAuthHeaders());
  },

  patch(action, data, config) {
    return axios.patch(config.endpoint + action, data, this.getAuthHeaders());
  },

  getAuthHeaders() {
    return { headers: { 'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN') } };
  },
}
