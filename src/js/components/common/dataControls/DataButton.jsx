import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export default class DataButton extends Component {
  static defaultProps = {
    cls: '',
    data: null,
    onClick: () => {},
    children: ''
  };

  static propTypes = {
    cls: PropTypes.string,
    data: PropTypes.any,
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  handleClick(event) {
    this.props.onClick(this.props.data, event);
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick} className={this.props.cls}>
        {this.props.children}
      </button>
    );
  }
}
