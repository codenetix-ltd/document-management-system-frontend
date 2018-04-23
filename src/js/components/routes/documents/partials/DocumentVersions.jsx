import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Modal from 'react-responsive-modal';

import { DataLink } from 'Components/common/dataControls';

import {
  $$versionsFetch,
  $$versionFetch
} from 'Store/thunks/versions';

import ViewContent from './ViewContent';

@autobind
export class DocumentVersions extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    versions: PropTypes.any.isRequired,
    version: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    const { dispatch, match: { params: { documentID } } } = this.props;
    if (documentID) {
      $$versionsFetch(dispatch, documentID);
    }
  }

  onViewClick(versionID) {
    const { dispatch, match: { params: { documentID } } } = this.props;
    $$versionFetch(dispatch, documentID, versionID, () => {
      this.setState({ open: true });
    });
  }

  onModalClose() {
    this.setState({ open: false });
  }

  sortDesc(a, b) {
    const left = Number(a.id);
    const right = Number(b.id);
    return right - left;
  }

  render() {
    const { versions: { list }, version } = this.props;
    const rows = list.sort(this.sortDesc).map(doc => {
      return (
        <tr key={doc.id}>
          <td>{doc.id}</td>
          <td>{doc.comment}</td>
          <td>{moment.unix(doc['createdAt']).format('YYYY-MM-DD HH:MM:SS')}</td>
          <td>
            <DataLink cls="btn btn btn-success btn-xs" data={doc.id} onClick={this.onViewClick}>
              <i className="fa fa-eye" /> View version
            </DataLink>
            &nbsp;
            <button className="btn btn btn-danger btn-xs">
              <i className="fa fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr><td>Version name</td><td>Comment</td><td>Created</td><td>Actions</td></tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <Modal open={this.state.open} onClose={this.onModalClose}>
          <h4>Document version overview</h4><hr />
          <ViewContent document={{ ...version, actualVersion: version }} />
          <button type="button" className="btn btn-default" onClick={this.onModalClose}>Close</button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ versions, version }) => ({ versions, version });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentVersions);
