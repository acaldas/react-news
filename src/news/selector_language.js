import React, { Component } from "react";

import Selector from "./selector";
import LanguageList from "./languages.json";

class SelectorLanguage extends Component {
  options = LanguageList;

  render() {
    return (
      <Selector
        name="language"
        options={this.options}
        onChange={this.props.onChange}
        render={(language, index) => (
          <option value={language} key={language}>
            {language.toUpperCase()}
          </option>
        )}
        emptyValue="All languages"
      />
    );
  }
}

export default SelectorLanguage;
