import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export default class DataCheckbox extends Component {
  static defaultProps = {
    cls: '',
    name: '',
    data: null,
    value: '',
    checked: false,
    onChange: () => {}
  };

  static propTypes = {
    cls: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    value: PropTypes.any,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  };

  handleChange(event) {
    this.props.onChange(event, this.props.data);
  }

  render() {
    const {
      cls,
      name,
      value,
      checked
    } = this.props;

    return (
      <input
        type="checkbox"
        name={name}
        className={cls}
        value={value}
        checked={checked}
        onChange={this.handleChange}
      />
    );
  }
}
