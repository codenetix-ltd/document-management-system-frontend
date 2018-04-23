import { format } from 'util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import AttributeForm from 'Routes/templates/attributes/partials/Form';

import axios from 'Services/request';
import { getAPI } from 'Config';

const API = getAPI();

@autobind
export default class AttributeAdd extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  onFormSubmit(formData) {
    const { templateID } = this.props.match.params;
    const url = format(API.attributes, templateID);
    axios.post(url, formData).then(() => {
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
    const { templateID } = this.props.match.params;
    const breadcrumbs = [
      { pageName: 'Templates', pageLink: '/templates/list', iconCls: 'fa fa-copy' },
      { pageName: `Edit template ${templateID}`, pageLink: `/templates/${templateID}`, iconCls: 'fa fa-pencil' },
      { pageName: 'Template attribute create', pageLink: '', iconCls: 'fa fa-plus' }
    ];

    if (this.state.submitted) {
      return (
        <Redirect to={`/templates/${templateID}`} />
      );
    }

    return (
      <div>
        <ContentHeader title="Template attribute create" breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Template attribute</h3>
          </div>
          <AttributeForm
            onSubmit={this.onFormSubmit}
            validate={this.validate}
          />
        </ContentWrapper>
      </div>
    );
  }
}
