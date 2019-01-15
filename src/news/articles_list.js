import React, { Component } from "react";
import styled from "styled-components";

import api from "./api";
import { Article } from "./article";

const Container = styled.div`
  width: 100%;
  text-align: left;
  ul {
    li {
      display: block;
      height: 100%;
      padding: 6px 6px;
    }
  }
`;

class NewsList extends Component {
  state = {
    loaded: false,
    articles: [],
    sources: [],
    query: "",
    category: "",
    sortBy: "publishedAt"
  };

  static async getArticles(sources, query) {
    let articles = await api.getArticles(sources, query);
    return articles;
  }

  _getArticlesKey(props, state) {
    return (
      props.sources.map(source => source.id).join(",") +
      state.query +
      state.sortBy
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this._getArticlesKey(prevProps, prevState) ===
      this._getArticlesKey(this.props, this.state)
    ) {
      return;
    }
    this.setState({ loaded: false });
    let articles = await NewsList.getArticles({
      sources: this.props.sources,
      query: this.state.query,
      category: this.state.category,
      sortBy: this.state.sortBy
    });
    this.setState({
      articles: articles || [],
      loaded: true
    });
  }

  handleInput = event => this.setState({ query: event.target.value });
  handleSortBy = event => this.setState({ sortBy: event.target.value });

  render() {
    return (
      <Container>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInput}
        />
        <select
          value={this.state.sortBy}
          onChange={this.handleSortBy}
          name="sortBy"
        >
          <option value="publishedAt">Date</option>
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
        </select>
        <ul>
          {this.state.articles.map((article, index) => (
            <Article key={index} {...article} />
          ))}
        </ul>
      </Container>
    );
  }
}

export default NewsList;
