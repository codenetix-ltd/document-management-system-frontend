import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import cln from 'classnames';
import { withRouter } from 'react-router-dom';

import { $$messageClear } from 'Store/thunks/message';

let showTimeout = null;
let hideTimeout = null;

@autobind
export class AlertMessage extends Component {
  static defaultProps = {
    onShow: () => {},
    onHide: () => {}
  };

  static propTypes = {
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    message: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const { message, history, dispatch } = this.props;
    const isRedirect = history.action === 'REPLACE';
    if (isRedirect) {
      this.showMessage(message);
    } else {
      $$messageClear(dispatch);
    }
  }

  componentWillReceiveProps({ message }) {
    this.showMessage(message);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    if (this.state.visible) {
      hideTimeout = setTimeout(() => {
        this.setState({ visible: false }, this.props.onHide);
        $$messageClear(dispatch);
      }, 5000);
    }
  }

  componentWillUnmount() {
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
  }

  showMessage(message) {
    if (message.type && message.text) {
      showTimeout = setTimeout(() => {
        this.setState({ visible: true }, this.props.onShow);
      }, 1000);
    }
  }

  render() {
    const { message } = this.props;
    const classes = cln(
      'alert',
      'dms-alert',
      { show: this.state.visible },
      { [`alert-${message.type}`]: true }
    );

    return (
      <div className={classes} role="alert">
        <span>{message.text}</span>
      </div>
    );
  }
}

const mapStateToProps = ({ message }) => ({ message });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Connected = connect(mapStateToProps, mapDispatchToProps)(AlertMessage);

export default withRouter(Connected);
