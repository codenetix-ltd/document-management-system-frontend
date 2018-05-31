import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import AttributeForm from 'Routes/templates/attributes/partials/Form';

import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import { $$attributeFetch } from 'Store/thunks/attributes';

import axios from 'Services/request';
import { getURL } from 'Config';

@autobind
export class AttributeEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    attribute: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired
  };

  componentDidMount() {
    this.fetchAttribute();
  }

  onFormSubmit(formData) {
    const { templateID, attributeID } = this.props.match.params;
    const url = getURL('attributes', templateID);
    axios.put(`${url}/${attributeID}`, formData).catch(console.trace);
  }

  getBreadcrumbs(templateID) {
    return [
      { pageName: 'Templates', pageLink: '/templates/list', iconCls: 'fa fa-copy' },
      { pageName: `Edit template ${templateID}`, pageLink: `/templates/${templateID}`, iconCls: 'fa fa-pencil' },
      { pageName: 'Template attribute edit', pageLink: '', iconCls: 'fa fa-plus' }
    ];
  }

  fetchAttribute() {
    const { dispatch, match } = this.props;
    const { templateID, attributeID } = match.params;
    $$attributeFetch(dispatch, templateID, attributeID);
  }

  render() {
    const { templateID } = this.props.match.params;
    return (
      <div>
        <ContentHeader title={`Edit ${this.props.attribute.name}`} breadcrumbs={this.getBreadcrumbs(templateID)} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Attribute data</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-sm-12">
                <AlertMessage />
                <ErrorMessage />
              </div>
            </div>
          </div>
          <AttributeForm
            onSubmit={this.onFormSubmit}
            submitButtonText="Update"
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ attribute }) => ({ attribute });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributeEdit);
