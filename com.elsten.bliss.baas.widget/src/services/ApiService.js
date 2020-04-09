import axios from 'axios';
import { appSettings } from '../defines/settings'

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

export const ApiService = {

  get(action) {
    return axios.get(appSettings.api + action, this.getAuthHeaders());
  },

  post(action, data){
    return axios.post(appSettings.api + action, data, this.getAuthHeaders());
  },

  del(action) {
    return axios.delete(appSettings.api + action, this.getAuthHeaders());
  },

  patch(action, data) {
    return axios.patch(appSettings.api + action, data, this.getAuthHeaders());
  },

  getAuthHeaders() {
    return { headers: { 'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN') } };
  },
}
