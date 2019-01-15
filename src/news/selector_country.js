import React, { Component } from "react";

import Selector from "./selector";
import CountryList from "./countries.json";

import { findFlagUrlByIso2Code } from "country-flags-svg";

class SelectorCountry extends Component {
  options = CountryList;

  render() {
    return (
      <Selector
        name="country"
        options={this.options}
        onChange={this.props.onChange}
        render={country => {
          return (
            <option
              value={country}
              key={country}
              background={findFlagUrlByIso2Code(country.toUpperCase())}
            >
              {country.toUpperCase()}
            </option>
          );
        }}
        emptyValue="All countries"
      />
    );
  }
}

export default SelectorCountry;
