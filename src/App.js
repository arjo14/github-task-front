import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CommitStatistic from "./components/CommitStatistic";
import RepositorySearch from "./components/repository/RepositorySearch";
import Layout from "./components/main/Layout";
import Bookmarks from "./components/Bookmarks";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/commits/:owner/:repo" component={CommitStatistic}/>
          <Route path="/bookmarks" component={Bookmarks}/>
          <Route path="/" component={RepositorySearch}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
