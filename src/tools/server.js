import axios from 'axios';

export default {
  makeRequest(method, urlPath, params) {
    const config = {
      method,
      url: `http://localhost:5000/${urlPath}`,
      headers: { 'Content-Type': 'application/json' },
      data: params,
    };
    return axios(config);
  },
};
