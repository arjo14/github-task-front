import React, {Component} from 'react';
import {getBookmarkedRepos} from "../network/utility";
import {Link} from "react-router-dom";

const tabStyle = {
  padding: '1%',
  width: '25%',
  // backgroundColor: 'white',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
};

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
