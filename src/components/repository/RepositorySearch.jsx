import React, {Component} from 'react';
import Repositories from "./Repositories";
import {searchRepositories} from "../../network/service/api";
import {Pagination as PaginationSemantic} from "semantic-ui-react";

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

const inputStyle = {
  borderRadius: '25px',
  padding: '9px 40px',
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid rgb(98, 98, 98)',
  outline: 'none',
  textAlign: 'center'
};
const inputErrorStyle = {
  borderRadius: '25px',
  padding: '9px 40px',
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid rgb(98, 98, 98)',
  outline: 'none',
  textAlign: 'center',
  borderColor: 'red'
};
const buttonStyle = {
  borderRadius: '25px',
  marginTop: '2%',
  fontWeight: '400',
  padding: '11px 45px',
  backgroundColor: 'rgb(36,41,46)',
  borderColor: 'rgba(32,32,32,0.33)',
  color: 'white',
  letterSpacing: ' 1px',
  lineHeight: '20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  outline: 'none',
};

class RepositorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: '',
      page: 1,
      pageCount: 10,
      perPage: 5,
      searchResult: [],
      hasError: false,

    };
  }

  setValue = (name, event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  searchRepos() {
    const {repo, page, perPage} = this.state;
    if (repo === '') {
      this.setState({
        hasError: true
      });
      return;
    }
    searchRepositories(repo, page, perPage)
      .then(data => {
        this.setState({
          searchResult: data.items,
          page: 1,
          pageCount: data.total_count % perPage === 0 ? data.total_count / perPage : data.total_count / perPage + 1
        });
      })
      .catch(err => alert(err))
  }

  setPageNum = (event, {activePage}) => {
    const {repo, perPage} = this.state;
    searchRepositories(repo, activePage, perPage)
      .then(data => {
        this.setState({
          searchResult: data.items,
          page: activePage,
          pageCount: data.total_count % perPage === 0 ? data.total_count / perPage : data.total_count / perPage + 1
        });
      })
      .catch(err => alert(err))
  };

  render() {
    const {searchResult, hasError} = this.state;

    return (
      <div style={{
        padding: '3% 25% 0 25%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <input value={this.state.repo}
                 style={hasError ? inputErrorStyle : inputStyle}
                 onChange={(e) => this.setValue("repo", e)}
                 placeholder="Search repositories 🔎"/>
          <button style={buttonStyle} onClick={() => this.searchRepos()}>Search</button>
        </div>
        <div style={{
          marginTop: '3%',
          padding: '0 0'
        }}>
          <Repositories items={searchResult}/>
          {
            searchResult && searchResult.length !== 0 &&
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '5%',
            }}>{style}
              <PaginationSemantic
                onPageChange={this.setPageNum}
                totalPages={this.state.pageCount}
                defaultActivePage={1}
                pointing
                secondary
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default RepositorySearch;
