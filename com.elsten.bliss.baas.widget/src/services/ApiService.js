import axios from 'axios';
import { appDefaultConfig } from '../defines/config';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

export const ApiService = {

  get(action, config) {
    return axios.get(this.buildApiLink(action, config), this.getAuthHeaders());
  },

  post(action, data, config){
    return axios.post(this.buildApiLink(action, config, true), data, this.getAuthHeaders());
  },

  del(action, config) {
    return axios.delete(this.buildApiLink(action, config), this.getAuthHeaders());
  },

  patch(action, data, config) {
    return axios.patch(this.buildApiLink(action, config), data, this.getAuthHeaders());
  },

  getAuthHeaders() {
    return { headers: { 'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN') } };
  },

  buildApiLink(action, config, post){
    if (config.endpoint === "local") {
      //axios.create({baseURL: 'http://localhost:3000'})
      if(post) {
        return appDefaultConfig.endpoint + action;
      }else{
        return appDefaultConfig.localapi + action.split("/")[0]+".json";
      }
    }else{
      return config.endpoint + action;
    }
  }
}
