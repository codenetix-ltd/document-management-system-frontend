import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { If, Then } from 'qc-react-conditionals/lib';
import { Tabs, Tab } from 'react-bootstrap';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';

import axios from 'Services/request';
import { API } from 'Config';

import { $$documentFetch } from 'Store/thunks/documents';

import DocumentForm from './partials/Form';
import AttributesForm from './partials/AttributesForm';
import DocumentVersions from './partials/DocumentVersions';

@autobind
export class DocumentEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    document: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
      newDocumentID: null,
      increaseVersion: false
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { documentID } = match.params;
    $$documentFetch(dispatch, documentID);
  }

  onTabSelect(activeKey) {
    this.setState({ activeKey });
  }

  onFormSubmit() {
    const { increaseVersion } = this.state;
    const { document, match } = this.props;
    const { documentID } = match.params;
    const doc = { ...document };
    doc.actualVersion.labelIds = doc.actualVersion.labels.map(l => l.id);
    if (documentID) {
      doc.createNewVersion = increaseVersion;
      axios.put(`${API.documents}/${documentID}`, doc);
    } else {
      axios.post(API.documents, doc).then(({ data }) => {
        if (!data.id) throw new Error('No id field in response.');
        this.setState({ newDocumentID: data.id });
      });
    }
  }

  toggleIncreaseVersion() {
    this.setState({
      increaseVersion: !this.state.increaseVersion
    });
  }

  breadcrumbs = [
    { pageName: 'Documents', pageLink: '/documents/list', iconCls: 'fa fa-copy' },
    { pageName: 'Edit document', pageLink: '', iconCls: 'fa fa-pencil' }
  ];

  render() {
    const { activeKey, newDocumentID, increaseVersion } = this.state;
    const { document: { actualVersion }, match, match: { params: { documentID } } } = this.props;
    if (newDocumentID) {
      return <Redirect to={`/documents/${newDocumentID}`} />;
    }
    return (
      <div>
        <ContentHeader title={`Edit document ${actualVersion.name}`} breadcrumbs={this.breadcrumbs} />
        <ContentWrapper noBox>
          <Tabs id="tabs" activeKey={activeKey} onSelect={this.onTabSelect} animation={false}>
            <Tab eventKey={1} title="Content">
              <div className="box-header with-border">
                <h3 className="box-title">General information</h3>
              </div>
              <DocumentForm />
              <If is={actualVersion.template}>
                <Then>
                  <div className="box-header with-border">
                    <h3 className="box-title">Document attributes</h3>
                  </div>
                  <AttributesForm />
                </Then>
              </If>
              <div className="box-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.onFormSubmit}
                >
                  { documentID ? 'Update' : 'Create' }
                </button>
                <div className="checkbox increase-version">
                  <label>
                    <input
                      type="checkbox"
                      checked={increaseVersion}
                      onClick={this.toggleIncreaseVersion}
                    /> Increase version
                  </label>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEdit);
