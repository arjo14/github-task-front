import React, {Component} from 'react';
import {searchCommits} from "../../network/service/api";
import CanvasJSReact from '../../canvasjs.react';
import {bookmarkRepo, isBookmarked, removeBookmarkedRepo} from "../../network/utility";
import CommitTree from "./CommitTree";
//var CanvasJSReact = require('./canvasjs.react');
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


class CommitStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      bookmarked: false,
      showCommitterChart: true,
    };
  }

  componentDidMount() {
    const {owner, repo} = this.props.match.params;
    let bookmarked = isBookmarked(owner, repo);
    searchCommits(owner, repo)
      .then(data => {
        this.setState({
          data,
          bookmarked
        })
      })
  }

  handleBookmarkChange() {
    const {owner, repo} = this.props.match.params;
    const {bookmarked} = this.state;

    if (this.state.bookmarked) {
      removeBookmarkedRepo(owner, repo);
    } else {
      bookmarkRepo(owner, repo);
    }
    this.setState({
      bookmarked: !bookmarked
    })
  }

  render() {
    const {owner, repo} = this.props.match.params;
    if (!this.state.data.committerMap) {
      return (<div/>);
    }
    const dataPoints = Object.entries(this.state.data.committerMap).map(([key, value]) => {
      return {
        y: value,
        label: key
      };
    });
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1",
      width: 800,
      height: 600,
      title: {
        text: "Committers"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: dataPoints
      }]
    };
    const pointerEmoji️ = this.state.showCommitterChart ? (<span role="img" aria-label="left">⬅</span>) : (
      <span role="img" aria-label="right">➡</span>);

    return (
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h1>{owner}/{repo}
            <img
              src={
                this.state.bookmarked ?
                  "https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_020_-_Star_2792946-1588613915223.png"
                  : "https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_icon-star_2867941-1588613931101.png"
              }
              alt="Repository"
              height="24px"
              style={{
                paddingLeft: '10px',
                cursor: 'pointer'
              }} onClick={this.handleBookmarkChange.bind(this)}/></h1>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            padding: '5px',
            cursor: 'pointer'
          }} onClick={() => this.setState({
            showCommitterChart: true
          })}><h2 style={this.state.showCommitterChart ? {color: '#00d800'} : {}}>Chart</h2>
          </div>
          <img
            src={
              this.state.showCommitterChart ?
                "https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_arrow-left_227602-1588632494920.png" :
                "https://fs.lightaffect.am/download?filePath=/assets/webacht/iconfinder_icon-arrow-right_2867862-1588632480041.png"
            }
            alt="arrow" height="32px"
            style={{padding: '0 15px'}}/>
          <div style={{
            padding: '5px',
            cursor: 'pointer'
          }} onClick={() => this.setState({
            showCommitterChart: false
          })}><h2 style={!this.state.showCommitterChart ? {color: '#00d800'} : {}}>Tree</h2>
          </div>
        </div>
        {
          this.state.showCommitterChart ?
            <div style={{
              display: 'flex',
              maxWidth: '1000px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <CanvasJSChart options={options}/>

            </div>
            :
            <CommitTree items={this.state.data.commitResponseItems}/>
        }
      </div>
    );
  }
}


export default CommitStatistic;
