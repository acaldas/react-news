import React, { Component } from "react";
import styled from "styled-components";

import api from "./api";
import SelectorCountry from "./selector_country";
import SelectorCategory from "./selector_category";
import SelectorLanguage from "./selector_language";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  ul {
    height: 40px;
    white-space: nowrap;
    overflow: auto;

    li {
      display: inline-block;
      height: 100%;
      padding: 0px 6px;
    }
  }
`;

class SourceList extends Component {
  state = {
    loaded: false,
    sources: [],
    country: "",
    category: "",
    language: ""
  };

  constructor() {
    super();
    this.getSources();
  }

  onSourcesChanged(sources) {
    sources = sources.slice(0);
    this.props.onSourcesChanged(sources);
  }

  _getSourcesKey(state) {
    return state.country + state.category + state.language;
  }

  async getSources() {
    this.setState({ loaded: false });
    let sources = await api.getSources({
      country: this.state.country,
      category: this.state.category,
      language: this.state.language
    });
    this.setState({
      sources: sources || [],
      loaded: true
    });
    this.onSourcesChanged(sources);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._getSourcesKey(prevState) !== this._getSourcesKey(this.state)) {
      this.getSources();
    }
  }

  handleCountry = country => this.setState({ country: country });
  handleCategory = category => this.setState({ category: category });
  handleLanguage = language => this.setState({ language: language });

  render() {
    return (
      <Container>
        <SelectorCountry onChange={this.handleCountry} />
        <SelectorCategory onChange={this.handleCategory} />
        <SelectorLanguage onChange={this.handleLanguage} />
        <ul>
          {this.state.sources.map(source => (
            <li key={source.id}>{source.name}</li>
          ))}
        </ul>
      </Container>
    );
  }
}

export default SourceList;
