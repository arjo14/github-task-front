import React, {Component} from 'react';
import {Link} from "react-router-dom";
// Import custom components
// import NavBar from "./common/navbar";

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {

    return (
      <div style={{
        backgroundColor: '#24292e',
        height: '80px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Link to="/">
          <img
            src="https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_Github_505223-1588604640908.png"
            alt="Repositories"
            height="60px"
            style={{
              padding: '0 10px'
            }}/>
        </Link>
        <Link to="/bookmarks">
          <img
            src="https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_xmas-13_41345-1588604748829.png"
            alt="Bookmarks"
            height="60px"
            style={{
              padding: '0 10px'
            }}/>
        </Link>
      </div>
    )
  }
}

export default Header;
