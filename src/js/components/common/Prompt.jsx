import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import cln from 'classnames';
import isFunction from 'lodash/isFunction';

// todo: use react-responsive-modal here
@autobind
export default class Prompt extends Component {
  static defaultProps = {
    headerText: 'Confirmation',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  };

  // todo: remove confirm and cancel props from files using this component
  static propTypes = {
    headerText: PropTypes.any,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onConfirm() {
    const { onConfirm } = this.settings;
    if (isFunction(onConfirm)) {
      onConfirm(() => {
        this.setState({ visible: false });
      });
    }
  }

  onCancel() {
    this.setState({ visible: false });
  }

  show(settings) {
    const { body } = settings;
    this.settings = settings;
    this.setState({ visible: true, body });
  }

  render() {
    const { body, visible } = this.state;
    const { headerText, cancelText, confirmText } = this.props;
    const classes = cln('dms-prompt', { show: visible });
    return (
      <div className={classes}>
        <div className="dms-prompt-overlay" role="none" onClick={this.onCancel} />
        <div className="dms-prompt-dialog">
          <div className="dms-prompt-header">
            <h3>{headerText}</h3>
          </div>
          <div className="dms-prompt-body">{body}</div>
          <div className="dms-prompt-footer">
            <button type="button" className="btn btn-danger" onClick={this.onCancel}>
              {cancelText}
            </button>
            <button type="button" className="btn btn-primary" onClick={this.onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
