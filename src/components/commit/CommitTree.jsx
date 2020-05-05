import React from 'react';
import PropTypes from 'prop-types';
import Time from "react-time-format";

const CommitTree = (items) => {
  console.log(items)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 15%'
    }}>
      {
        items.items.map(commit => {
            return (
              <div style={{
                borderTop: '1px solid #e1e4e8',
                width: '600px',
              }}>
                <div style={{
                  float: 'left'
                }}>
                  <p
                    style={{fontSize: '14px'}}>{commit.commit.message.length > 63 ? commit.commit.message.substring(0, 60) + "..." : commit.commit.message.substring(0, 60)}</p>
                  <p style={{fontSize: '12px'}}> {commit.committer &&
                  <img src={commit.committer.avatar_url} alt="user image"
                       height="20px"/>} {commit.commit.committer.name} committed on <Time
                    value={commit.commit.committer.date} format="hh:mm YYYY-MM-DD"/></p>
                </div>
                <div style={{
                  float: 'right'
                }}>
                  <p style={{color: '#0366d6'}}>{commit.sha.substring(0, 7)}</p>
                </div>
              </div>
            )
          }
        )
      }
    </div>
  );
};

CommitTree.propTypes = {
  items: PropTypes.array.isRequired
};

export default CommitTree;
