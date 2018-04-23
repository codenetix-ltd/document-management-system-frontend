import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import Tabs from 'Components/common/Tabs';

import DocumentContent from './partials/DocumentContent';

@autobind
export default class DocumentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsConfig: []
    };
  }

  componentDidMount() {
    this.setState({
      tabsConfig: [
        {
          title: 'Content',
          active: true,
          content: <DocumentContent />
        }
      ]
    });
  }

  render() {
    const { tabsConfig } = this.state;
    const breadcrumbs = [
      { pageName: 'Documents', pageLink: '/documents/list', iconCls: 'fa fa-copy' },
      { pageName: 'Document create', pageLink: '/documents', iconCls: 'fa fa-plus' }
    ];
    return (
      <div>
        <ContentHeader title="Document create" breadcrumbs={breadcrumbs} />
        <ContentWrapper noBox>
          <Tabs list={tabsConfig} />
        </ContentWrapper>
      </div>
    );
  }
}
