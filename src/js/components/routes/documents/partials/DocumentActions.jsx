import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { $setSelectedDocuments } from 'Store/actions';
import {
  $$documentsMassArchive,
  $$documentsMassDelete
} from 'Store/thunks/documents';

import MassArchiveModal from './MassArchiveModal';

@autobind
export class DocumentActions extends Component {
  static defaultProps = {
    prompt: null,
    substituteDocument: null
  };

  static propTypes = {
    prompt: PropTypes.any,
    substituteDocument: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    selectedDocuments: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      compareURL: ''
    };
  }

  onMassArchive() {
    const { prompt, dispatch, selectedDocuments } = this.props;
    const ids = selectedDocuments.map(({ id }) => id);
    prompt.show({
      width: 555,
      body: <MassArchiveModal />,
      confirmText: 'Archive',
      onConfirm: close => {
        const { substituteDocument: { id } } = this.props;
        $$documentsMassArchive(dispatch, ids, id, () => {
          close();
          dispatch($setSelectedDocuments([]));
        });
      }
    });
  }

  onMassDelete() {
    const { selectedDocuments, dispatch, prompt } = this.props;
    const ids = selectedDocuments.map(({ id }) => id);
    prompt.show({
      body: 'Do you really want to delete these documents?',
      confirmText: 'Delete',
      onConfirm: close => {
        $$documentsMassDelete(dispatch, ids, () => {
          close();
          dispatch($setSelectedDocuments([]));
        });
      }
    });
  }

  onCompare() {
    const { selectedDocuments } = this.props;
    const ids = selectedDocuments.map(({ id }) => id).join(',');
    this.setState({
      compareURL: `/compare?documentIds=${ids}`
    });
  }

  render() {
    const { compareURL } = this.state;
    const { selectedDocuments: selected } = this.props;
    if (compareURL) {
      return <Redirect to={compareURL} />;
    }
    return (
      <div className="form-inline pull-right document-actions">
        <div className="form-group">
          <Link to="/documents" className="btn btn-success">
            <i className="fa fa-plus" /> Add document
          </Link>
        </div>
        &nbsp;
        <div className="form-group">
          <button
            className="btn btn-warning"
            type="button"
            onClick={this.onMassArchive}
            disabled={!selected.length}
          >
            <i className="fa fa-book" /> Archive selected
          </button>
        </div>
        &nbsp;
        <div className="form-group">
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.onMassDelete}
            disabled={!selected.length}
          >
            <i className="fa fa-book" /> Delete selected
          </button>
        </div>
        &nbsp;
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onCompare}
            disabled={!selected.length}
          >
            <i className="fa fa-copy" /> Compare selected
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedDocuments, substituteDocument }) => ({ selectedDocuments, substituteDocument });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActions);
