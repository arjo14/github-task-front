import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export function request(requestData) {
  return instance(requestData).catch(err => {
    return Promise.reject(err);
  });
}
