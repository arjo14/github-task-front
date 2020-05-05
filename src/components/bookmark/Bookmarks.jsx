import React, {Component} from 'react';
import {getBookmarkedRepos} from "../../network/utility";
import {Link} from "react-router-dom";

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkedRepos: []
    };
  }

  componentDidMount() {
    const repos = getBookmarkedRepos();
    this.setState({
      bookmarkedRepos: repos,
    })
  }


  render() {
    const {bookmarkedRepos} = this.state;
    if (!bookmarkedRepos || bookmarkedRepos.length === 0) {
      return (<div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}><h2>You don't have bookmarked repositories.</h2></div>)
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1% 0 0 0'
      }}>
        {
          bookmarkedRepos.map(item => {
            let arr = item.split('/');
            return (
              <div style={{
                paddingTop: '10px'
              }}>
                <Link to={`/commits/${arr[0]}/${arr[1]}`} style={{
                  color: '#0366d6'
                }}>
                  {item}
                </Link>
              </div>);
          })
        }
      </div>
    );
  }
}

export default Bookmarks;
