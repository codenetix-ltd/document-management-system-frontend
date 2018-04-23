import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import cln from 'classnames';
import isFunction from 'lodash/isFunction';

@autobind
export default class PromptWrapper extends Component {
  static defaultProps = {
    headerText: 'Confirmation',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    children: null
  };

  static propTypes = {
    headerText: PropTypes.any,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.any
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
    const classes = cln('dms-prompt', { show: visible });
    const {
      children,
      headerText,
      cancelText,
      confirmText
    } = this.props;
    return (
      <div className="prompt-wrapper">
        {
          isFunction(children) && children({
            show: this.show,
            hide: this.onCancel
          })
        }
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
      </div>
    );
  }
}
