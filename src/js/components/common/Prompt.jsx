import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import cln from 'classnames';
import isFunction from 'lodash/isFunction';

// todo: use react-responsive-modal here
@autobind
export default class Prompt extends Component {
  static defaultProps = {
    body: '',
    headerText: 'Confirmation',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  };

  // todo: remove confirm and cancel props from files using this component
  static propTypes = {
    body: PropTypes.any,
    headerText: PropTypes.any,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      onConfirm: () => {}
    };
  }

  onConfirm() {
    const { onConfirm } = this.state;
    if (isFunction(onConfirm)) {
      onConfirm(() => {
        this.setState({ visible: false });
      });
    } else {
      throw new Error('onConfirm option should be a function');
    }
  }

  onCancel() {
    this.setState({
      visible: false
    });
  }

  show(settings) {
    if (!settings.width) {
      settings.width = 360; // eslint-disable-line
    }
    this.setState({
      visible: true,
      ...settings
    });
  }

  render() {
    const {
      body,
      headerText,
      cancelText,
      confirmText
    } = this.props;
    const classes = cln('dms-prompt', { show: this.state.visible });
    return (
      <div className={classes}>
        <div className="dms-prompt-overlay" role="none" onClick={this.onCancel} />
        <div className="dms-prompt-dialog" style={{ width: `${this.state.width || 360}px` }}>
          <div className="dms-prompt-header">
            <h3>{this.state.headerText || headerText}</h3>
          </div>
          <div className="dms-prompt-body">{this.state.body || body}</div>
          <div className="dms-prompt-footer">
            <button type="button" className="btn btn-danger" onClick={this.onCancel}>
              {this.state.cancelText || cancelText}
            </button>
            <button type="button" className="btn btn-primary" onClick={this.onConfirm}>
              {this.state.confirmText || confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
