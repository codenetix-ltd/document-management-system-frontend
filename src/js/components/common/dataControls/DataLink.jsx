import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export default class DataLink extends Component {
  static defaultProps = {
    cls: '',
    data: null,
    disabled: false,
    onClick: () => {},
    children: ''
  };

  static propTypes = {
    cls: PropTypes.string,
    data: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick(this.props.data, event);
  }

  render() {
    const { disabled, children, cls } = this.props;
    if (disabled) {
      return <span className={cls} role="none">{children}</span>;
    }
    return <a href="#" onClick={this.handleClick} className={cls}>{children}</a>;
  }
}
