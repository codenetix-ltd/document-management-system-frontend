import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { DebounceInput } from 'react-debounce-input';

@autobind
export default class InputFilter extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  onValueChange({ target }) {
    const { value } = target;
    const { onChange, filterType } = this.props;
    onChange(filterType, value);
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <span className="input-group-addon">{this.props.label}:</span>
        <DebounceInput
          type="text"
          className="form-control input-sm filter-column filter-type-text"
          placeholder={this.props.placeholder}
          onChange={this.onValueChange}
          debounceTimeout={300}
        />
      </div>
    );
  }
}
