import {config} from '../config';

export function getBookmarkedRepos() {
  return JSON.parse(localStorage.getItem(config.bookmarkedRepos));
}

export function bookmarkRepo(author, repo) {
  let repos = JSON.parse(localStorage.getItem(config.bookmarkedRepos));
  if (!repos) {
    repos = [];
  }
  let index = repos.findIndex(item => item === `${author}/${repo}`);
  if (index < 0) {
    repos.push(`${author}/${repo}`);
    localStorage.setItem(config.bookmarkedRepos, JSON.stringify(repos));
  }
}

export function isBookmarked(author, repo) {
  let repos = JSON.parse(localStorage.getItem(config.bookmarkedRepos));
  if (!repos) {
    return false;
  }
  let index = repos.findIndex(item => item === `${author}/${repo}`);
  return index >= 0;
}

export function removeBookmarkedRepo(author, repo) {
  let repos = JSON.parse(localStorage.getItem(config.bookmarkedRepos));
  if (!repos) {
    return;
  }
  let index = repos.findIndex(item => item === `${author}/${repo}`);
  if (index || index >= 0) {
    repos.splice(index, 1);
    localStorage.setItem(config.bookmarkedRepos, JSON.stringify(repos))
  }
}
