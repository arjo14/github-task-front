import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Time from 'react-time-format';

const RepositoryRow = (repo) => {
  const repository = repo.repo;
  return (
    <div style={{
      borderTop: '1px solid #e1e4e8',
      padding: '10px',

    }}>
      <div style={{
        float: 'left'
      }}>
        <img
          src="https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_github_390754-1588611368382.png"
          alt="Repository"
          height="24px"
          style={{
            paddingRight: '10px'
          }}/>
      </div>
      <div>
        <div style={{
          fontWeight: '400'
        }}>
          <Link to={`/commits/${repository.owner.login}/${repository.name}`} style={{
            color: '#0366d6'
          }}>
            {repository.full_name}
          </Link>
          <div style={{
            float: 'right'
          }}>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer"
               style={{
                 cursor: 'pointer'
               }}>
              <img
                src={"https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_Link_2_171520-1588616056255.png"}
                alt="Repository"
                height="24px"
                style={{
                  alignItems: 'right'
                }}/>
            </a>
          </div>
        </div>
      </div>
      <div style={{
        margin: '5px 0'
      }}>
        {repository.description}
      </div>
      <div style={{
        display: 'flex',
        width: '100%',
        fontSize: '12px'

      }}>
        <div>
          <span role="img" aria-label="stars">⭐{repository.stargazers_count}</span>
        </div>
        <div style={{
          padding: '0 10px',

        }}>
          <span role="img" aria-label="watchers">👁️‍🗨️{repository.watchers}</span>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          {repository.language}
        </div>
        <div>
          Created at <Time value={repository.created_at} format="hh:mm YYYY-MM-DD"/>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          Updated on <Time value={repository.updated_at} format="hh:mm YYYY-MM-DD"/>
        </div>
      </div>
    </div>
  );
};

RepositoryRow.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepositoryRow;
