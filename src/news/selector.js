import React, { Component } from "react";

import styled from "styled-components";

const Select = styled.select`
  text-transform: capitalize;
`;

class Selector extends Component {
  state = {
    value: ""
  };

  onChange = event => {
    let value = event.target.value;
    this.setState({ value: value });
    this.props.onChange(value);
  };

  render() {
    let emptyOption = this.props.emptyValue ? (
      <option value="" key="this.props.emptyValue">
        {this.props.emptyValue}
      </option>
    ) : null;
    return (
      <Select
        value={this.state.value}
        onChange={this.onChange}
        name={this.props.name}
      >
        {emptyOption}
        {this.props.options.map(this.props.render)}
      </Select>
    );
  }
}

export default Selector;
