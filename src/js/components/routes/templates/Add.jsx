import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import TemplateForm from 'Routes/templates/partials/Form';

@autobind
export default class TemplateAdd extends Component {
  breadcrumbs = [
    { pageName: 'Templates', pageLink: '/templates/list', iconCls: 'fa fa-copy' },
    { pageName: 'Template create', pageLink: '/templates', iconCls: 'fa fa-plus' }
  ];

  render() {
    return (
      <div>
        <ContentHeader title="Template create" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Template data</h3>
          </div>
          <TemplateForm match={{ params: {} }} />
        </ContentWrapper>
      </div>
    );
  }
}
