import React, { Component } from "react";
import "./App.css";

import { ArticlesList, SourceList } from "./news";

class App extends Component {
  state = {
    sources: []
  };

  onSourcesChanged = sources => {
    this.setState({ sources: sources });
  };

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <SourceList onSourcesChanged={this.onSourcesChanged} />
          <ArticlesList sources={this.state.sources} />
        </div>
      </div>
    );
  }
}

export default App;
