import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { If, Then } from 'qc-react-conditionals/lib';
import { withRouter, Redirect } from 'react-router-dom';

import get from 'lodash/get';

import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import axios from 'Services/request';
import { API } from 'Config';

import DocumentForm from './Form';
import AttributesForm from './AttributesForm';

@autobind
export class DocumentContent extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    document: PropTypes.any.isRequired,
    profile: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newDocumentID: null
    };
  }

  onFormSubmit() {
    const { document, profile, match } = this.props;
    const { documentID } = match.params;
    const doc = { ...document };
    doc.ownerId = profile.id;
    doc.actualVersion.templateId = get(document, 'actualVersion.template.id');
    if (documentID) {
      axios.put(`${API.documents}/${documentID}`, doc);
    } else {
      axios.post(API.documents, doc).then(({ data }) => {
        if (!data.id) throw new Error('No id field in response.');
        this.setState({ newDocumentID: data.id });
      });
    }
  }

  render() {
    const { document, match } = this.props;
    const { documentID } = match.params;
    const { newDocumentID } = this.state;
    if (newDocumentID) {
      return <Redirect to={`/documents/${newDocumentID}`} />;
    }
    return (
      <div>
        <AlertMessage />
        <ErrorMessage />
        <div className="box-header with-border">
          <h3 className="box-title">General information</h3>
        </div>
        <DocumentForm />
        <If is={document.template}>
          <Then>
            <div className="box-header with-border">
              <h3 className="box-title">Document attributes</h3>
            </div>
            <AttributesForm />
          </Then>
        </If>
        <div className="box-footer">
          <button
            className="btn btn-success"
            type="button"
            onClick={this.onFormSubmit}
          >
            { documentID ? 'Update' : 'Create' }
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ document, profile }) => ({ document, profile });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export const Connected = connect(mapStateToProps, mapDispatchToProps)(DocumentContent);

export default withRouter(Connected);

