import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import moment from 'moment';
import first from 'lodash/first';
import pick from 'lodash/pick';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import Pagination from 'Components/partials/Pagination';

import Prompt from 'Components/common/Prompt';
import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';
import SelectableTable from 'Components/common/SelectableTable';

import { DataLink } from 'Components/common/dataControls';

import {
  $$documentArchive,
  $$documentDelete,
  $$documentsFetch
} from 'Store/thunks/documents';

import { $setSelectedDocuments } from 'Store/actions';

import FiltersWrapper from './partials/FiltersWrapper';
import DocumentActions from './partials/DocumentActions';
import ArchiveModalContent from './partials/ArchiveModalContent';

@autobind
export class DocumentsList extends Component {
  static defaultProps = {
    substituteDocument: null
  };

  static propTypes = {
    substituteDocument: PropTypes.any,
    documents: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.clearSelection();
  }

  onFetchData(tableProps) {
    let orderBy = 'id';
    let sortedBy = 'desc';
    const { dispatch } = this.props;
    const { page, sorted } = tableProps;
    const sortData = first(sorted);
    if (sortData) {
      orderBy = sortData['id'];
      sortedBy = sortData['desc'] ? 'desc' : 'asc';
    }
    $$documentsFetch(dispatch, {
      page: page + 1,
      orderBy,
      sortedBy
    }, this.clearSelection);
  }

  onSelect(selected) {
    this.props.dispatch($setSelectedDocuments(selected));
  }

  onArchive({ value: { actualVersion } }) {
    const { dispatch } = this.props;
    this.prompt.show({
      width: 555,
      body: <ArchiveModalContent />,
      confirmText: 'Archive',
      onConfirm: close => {
        const { substituteDocument: { id } } = this.props;
        $$documentArchive(dispatch, actualVersion, id, close);
      }
    });
  }

  onDelete({ value: { actualVersion } }) {
    const { dispatch } = this.props;
    this.prompt.show({
      body: `Do you really want to delete document ${actualVersion.name}?`,
      confirmText: 'Delete',
      onConfirm: close => $$documentDelete(dispatch, actualVersion, close)
    });
  }

  clearSelection() {
    this.props.dispatch($setSelectedDocuments([]));
  }

  breadcrumbs = [
    { pageName: 'Documents list', pageLink: '/documents/list', iconCls: 'fa fa-list' }
  ];

  columns = [
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

  render() {
    const { documents, loading } = this.props;
    return (
      <div>
        <ContentHeader title="Documents" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-success">
          <div className="box-body">
            <FiltersWrapper />
            <hr />
            <DocumentActions prompt={this.prompt} />
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <AlertMessage />
                  <ErrorMessage />
                  <SelectableTable
                    manual
                    className="-striped"
                    columns={[...this.columns]}
                    data={documents.list}
                    pages={documents.lastPage}
                    loading={loading}
                    onFetchData={this.onFetchData}
                    onSelect={this.onSelect}
                    defaultPageSize={15}
                    PaginationComponent={Pagination}
                    multiSort={false}
                    resizable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
        <Prompt ref={p => { this.prompt = p; }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => pick(state, ['documents', 'loading', 'substituteDocument']);

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
