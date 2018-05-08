import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import { Tabs, Tab } from 'react-bootstrap';

import DocumentContent from './partials/DocumentContent';

@autobind
export default class DocumentAdd extends Component {
  breadcrumbs = [
    { pageName: 'Documents', pageLink: '/documents/list', iconCls: 'fa fa-copy' },
    { pageName: 'Document create', pageLink: '/documents', iconCls: 'fa fa-plus' }
  ];

  render() {
    return (
      <div>
        <ContentHeader title="Document create" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper noBox>
          <Tabs id="tabs">
            <Tab eventKey={1} title="Content">
              <DocumentContent />
            </Tab>
          </Tabs>
        </ContentWrapper>
      </div>
    );
  }
}
