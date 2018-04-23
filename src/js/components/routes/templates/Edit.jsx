import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import TemplateForm from 'Routes/templates/partials/Form';

import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

@autobind
export class TemplateEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    template: PropTypes.any.isRequired
  };

  render() {
    const breadcrumbs = [
      { pageName: 'Templates', pageLink: '/templates/list', iconCls: 'fa fa-copy' },
      { pageName: 'Edit template', pageLink: '/templates', iconCls: 'fa fa-pencil' }
    ];

    return (
      <div>
        <ContentHeader title={`Edit ${this.props.template.name}`} breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Template data</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-sm-12">
                <AlertMessage />
                <ErrorMessage />
              </div>
            </div>
          </div>
          <TemplateForm
            match={this.props.match}
            submitButtonText="Update"
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ template }) => ({ template });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
