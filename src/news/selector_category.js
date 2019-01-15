import React, { Component } from "react";

import Selector from "./selector";
import CategoryList from "./categories.json";

class SelectorCategory extends Component {
  options = CategoryList;

  render() {
    return (
      <Selector
        name="category"
        options={this.options}
        onChange={this.props.onChange}
        style={{ "text-transform": "capitalize" }}
        render={category => (
          <option value={category} key={category}>
            {category}
          </option>
        )}
        emptyValue="All categories"
      />
    );
  }
}

export default SelectorCategory;
