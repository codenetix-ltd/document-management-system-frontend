import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import moment from 'moment';
import first from 'lodash/first';
import pick from 'lodash/pick';

import ReactTable from 'react-table';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import Pagination from 'Components/partials/Pagination';

import Prompt from 'Components/common/Prompt';
import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import { DataLink } from 'Components/common/dataControls';

@autobind
export class Home extends Component {
  static propTypes = {
    logs: PropTypes.any.isRequired,
    profile: PropTypes.any.isRequired,
    documents: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onDocumentsFetch(tableProps) {
    let sortField = 'id';
    let sortDirection = 'desc';
    const { dispatch, profile } = this.props;
    const { page, sorted } = tableProps;
    const sortData = first(sorted);
    if (sortData) {
      sortField = sortData['id'];
      sortDirection = sortData['desc'] ? 'desc' : 'asc';
    }
    import('Store/thunks/documents').then(({ $$documentsFetch }) => {
      $$documentsFetch(dispatch, {
        page: page + 1,
        sortField,
        sortDirection,
        ownerID: profile.id
      });
    });
  }

  onLogsFetch(tableProps) {
    let sortField = 'id';
    let sortDirection = 'desc';
    const { dispatch } = this.props;
    const { page, sorted } = tableProps;
    if (sorted[0]) {
      sortField = sorted[0].id;
      sortDirection = sorted[0].desc ? 'desc' : 'asc';
    }
    import('Store/thunks/logs').then(({ $$logsFetch }) => {
      $$logsFetch(dispatch, {
        page: page + 1,
        sortField,
        sortDirection
      });
    });
  }

  onArchive() {}

  onDelete({ value }) {
    const { actualVersion } = value;
    const { dispatch } = this.props;
    import('Store/thunks/documents').then(({ $$documentDelete }) => {
      this.prompt.show({
        body: `Do you really want to delete document ${actualVersion.name}?`,
        onConfirm: close => $$documentDelete(dispatch, actualVersion, close)
      });
    });
  }

  documentsColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      maxWidth: 65,
    }, {
      Header: 'Name',
      accessor: 'actualVersion.name',
    }, {
      Header: 'Owner',
      accessor: 'owner.fullName',
    }, {
      Header: 'Template ',
      accessor: 'actualVersion.template.name',
    }, {
      Header: 'Created at',
      accessor: 'createdAt',
      Cell: ({ value }) => moment.unix(value).format('YYYY/MM/DD')
    }, {
      Header: 'Updated at',
      accessor: 'updatedAt',
      Cell: ({ value }) => moment.unix(value).format('YYYY/MM/DD')
    }, {
      Header: 'Actions',
      accessor: '',
      maxWidth: 122,
      sortable: false,
      Cell: rowData => {
        const viewLink = `/documents/view/${rowData.value.id}`;
        const editLink = `/documents/${rowData.value.id}`;
        return (
          <div>
            <Link to={viewLink} className="btn btn-primary btn-xs">
              <i className="fa fa-eye" />
            </Link>
            &nbsp;
            <Link to={editLink} className="btn-success btn btn-xs">
              <i className="fa fa-edit" />
            </Link>
            &nbsp;
            <DataLink cls="btn btn btn-warning btn-xs" data={rowData} onClick={this.onArchive}>
              <i className="fa fa-book" />
            </DataLink>
            &nbsp;
            <DataLink cls="btn-danger btn btn-xs" data={rowData} onClick={this.onDelete}>
              <i className="fa fa-trash" />
            </DataLink>
          </div>
        );
      }
    }
  ];

  logsColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      maxWidth: 100
    }, {
      Header: 'User',
      accessor: 'user.fullName'
    }, {
      Header: 'Action',
      accessor: 'action'
    }, {
      Header: 'Link',
      accessor: 'link',
      Cell: ({ value }) => <Link to={value.url}>{value.title}</Link>
    }, {
      Header: 'Type',
      accessor: 'type'
    }, {
      Header: 'Created at',
      accessor: 'createdAt',
      Cell: ({ value }) => moment.unix(value).format('YYYY/MM/DD')
    }
  ];

  render() {
    const { documents, logs, loading } = this.props;
    return (
      <div>
        <ContentHeader title="Dashboard" breadcrumbs={[]} />
        <ContentWrapper boxClass="box-success">
          <div className="box-body user-dashboard">
            <div className="row">
              <div className="col-lg-6">
                <div className="box-header with-border">
                  <h3 className="box-title">User documents</h3>
                </div>
                <AlertMessage />
                <ErrorMessage />
                <ReactTable
                  manual
                  className="-striped"
                  columns={[...this.documentsColumns]}
                  data={documents.list}
                  pages={documents.lastPage}
                  loading={loading}
                  onFetchData={this.onDocumentsFetch}
                  defaultPageSize={15}
                  PaginationComponent={Pagination}
                  multiSort={false}
                  resizable={false}
                />
              </div>
              <div className="col-lg-6">
                <div className="box-header with-border">
                  <h3 className="box-title">Latest actions</h3>
                </div>
                <ReactTable
                  manual
                  className="-striped"
                  columns={[...this.logsColumns]}
                  data={logs.list}
                  pages={logs.lastPage}
                  loading={loading}
                  onFetchData={this.onLogsFetch}
                  defaultPageSize={15}
                  PaginationComponent={Pagination}
                  multiSort={false}
                  resizable={false}
                />
              </div>
            </div>
          </div>
        </ContentWrapper>
        <Prompt ref={p => { this.prompt = p; }} confirmText="Delete" />
      </div>
    );
  }
}

const mapStateToProps = (state) => pick(state, ['documents', 'logs', 'loading', 'profile']);

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
