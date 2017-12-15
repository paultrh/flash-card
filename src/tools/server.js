import axios from 'axios';
import env from './../../env';

export default {
  makeRequest(method, urlPath, params) {
    const config = {
      method,
      url: `http://${env.IPV4}:5000/${urlPath}`,
      headers: { 'Content-Type': 'application/json' },
      data: params,
    };
    return axios(config);
  },
};
