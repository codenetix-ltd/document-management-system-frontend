import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export class FormError extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    errors: PropTypes.any.isRequired
  };

  render() {
    const { errors, field } = this.props;
    const text = errors[field] || '';
    return (
      <span className="help-block text-red">{text}</span>
    );
  }
}

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FormError);
