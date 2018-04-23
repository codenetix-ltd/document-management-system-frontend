import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import LabelForm from 'Routes/labels/partials/Form';
import { API } from 'Config';

import { $$messageSet } from 'Store/thunks/message';

@autobind
export class LabelAdd extends Component {
  static propTypes = {
    dispatch: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  onFormSubmit(formData) {
    axios.post(API.users, formData).then(() => {
      this.setState({
        submitted: true
      });
    }).catch(err => {
      throw err;
    });
  }

  validate(formFields) {
    if (formFields) {
      return !Object.keys(formFields).every(key => !!formFields[key]);
    }
    return true;
  }

  render() {
    const breadcrumbs = [
      { pageName: 'Labels', pageLink: '/labels', iconCls: 'fa fa-plus' }
    ];

    if (this.state.submitted) {
      $$messageSet(this.props.dispatch, {
        type: 'success',
        text: 'The label was successfully created.'
      });
      return (<Redirect to="/labels/list" />);
    }

    return (
      <div>
        <ContentHeader title="Label create" breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Label</h3>
          </div>
          <LabelForm
            onSubmit={this.onFormSubmit}
            validate={this.validate}
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LabelAdd);
