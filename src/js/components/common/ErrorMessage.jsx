import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import cln from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { $$errorClear } from 'Store/thunks/error';

let showTimeout = null;
let hideTimeout = null;

@autobind
export class ErrorMessage extends Component {
  static defaultProps = {
    onShow: () => {},
    onHide: () => {}
  };

  static propTypes = {
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const { error, dispatch } = this.props;
    if (!isEmpty(error)) {
      $$errorClear(dispatch);
    }
  }

  componentWillReceiveProps({ error }) {
    this.showMessage(error);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    if (this.state.visible) {
      hideTimeout = setTimeout(() => {
        this.setState({ visible: false }, this.props.onHide);
        $$errorClear(dispatch);
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

  showMessage(error) {
    if (error.message) {
      showTimeout = setTimeout(() => {
        this.setState({ visible: true }, this.props.onShow);
      }, 1000);
    }
  }

  render() {
    const { error } = this.props;
    const classes = cln(
      'alert',
      'dms-alert',
      'alert-danger',
      { show: this.state.visible }
    );

    return (
      <div className={classes} role="alert">
        <span>{ `${error.name}: ${error.message}` }</span>
      </div>
    );
  }
}

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
