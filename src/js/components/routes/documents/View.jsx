import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Tabs, Tab } from 'react-bootstrap';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';

import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import {
  $$documentFetch,
  $$documentReset
} from 'Store/thunks/documents';

import ViewContent from './partials/ViewContent';
import DocumentVersions from './partials/DocumentVersions';

@autobind
export class DocumentView extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    document: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { documentID } = match.params;
    if (documentID) {
      $$documentFetch(dispatch, documentID);
    }
  }

  componentWillUnmount() {
    $$documentReset(this.props.dispatch);
  }

  onTabSelect(activeKey) {
    this.setState({ activeKey });
  }

  breadcrumbs = [
    { pageName: 'Documents', pageLink: '/documents/list', iconCls: 'fa fa-list' },
    { pageName: 'View document', pageLink: '', iconCls: 'fa fa-eye' }
  ];

  render() {
    const { activeKey } = this.state;
    const { match, document, document: { actualVersion: doc } } = this.props;
    return (
      <div>
        <ContentHeader title={`View document ${doc && doc.name}`} breadcrumbs={this.breadcrumbs} />
        <ContentWrapper noBox>
          <AlertMessage />
          <ErrorMessage />
          <Tabs id="tabs" activeKey={activeKey} onSelect={this.onTabSelect} animation={false}>
            <Tab eventKey={1} title="Content">
              <ViewContent document={document} />
            </Tab>
            <Tab eventKey={2} title="Versions">
              <DocumentVersions match={match} />
            </Tab>
          </Tabs>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ document }) => ({ document });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
