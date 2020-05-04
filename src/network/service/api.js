import {request} from '../RequestManager';
import {config} from '../../config';

const backendHost = config.BACKEND_HOST;

export function searchRepositories(text, page, perPage) {
  return request({
    method: 'GET',
    baseURL: backendHost,
    url: `/search/repositories?text=${text}&&page=${page}&&perPage=${perPage}`,
  }).then(response => response.data);
}

export function searchCommits(owner, repo) {
  return request({
    method: 'GET',
    baseURL: backendHost,
    url: `/search/commits?owner=${owner}&&repo=${repo}`,
  }).then(response => response.data);
}
