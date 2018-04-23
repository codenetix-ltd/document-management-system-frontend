import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { $setSelectedDocuments } from 'Store/actions';
import { $$documentsMassDelete } from 'Store/thunks/documents';

@autobind
export class DocumentActions extends Component {
  static propTypes = {
    prompt: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    selectedDocuments: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      compareURL: ''
    };
  }

  onArchive() {}

  onDelete() {
    const { selectedDocuments, dispatch, prompt } = this.props;
    const ids = selectedDocuments.map(({ id }) => id);
    prompt.show({
      body: 'Do you really want to delete these documents?',
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
    if (compareURL) {
      return <Redirect to={compareURL} />;
    }
    return (
      <div className="form-inline pull-right document-actions">
        <div className="form-group">
          <Link to="/documents" className="btn btn-success form-control">
            <i className="fa fa-plus" /> Add document
          </Link>
        </div>
        &nbsp;
        <div className="form-group">
          <button className="btn btn-warning form-control" type="button" onClick={this.onArchive}>
            <i className="fa fa-book" /> Archive selected
          </button>
        </div>
        &nbsp;
        <div className="form-group">
          <button className="btn btn-danger form-control" type="button" onClick={this.onDelete}>
            <i className="fa fa-book" /> Delete selected
          </button>
        </div>
        &nbsp;
        <div className="form-group">
          <button className="btn btn-primary form-control" type="button" onClick={this.onCompare}>
            <i className="fa fa-copy" /> Compare selected
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedDocuments }) => ({ selectedDocuments });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActions);