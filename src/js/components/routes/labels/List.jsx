import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import ReactTable from 'react-table';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import Pagination from 'Components/partials/Pagination';
import ActionsCell from 'Components/partials/ActionsCell';

import Prompt from 'Components/common/Prompt';
import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import {
  $$labelsFetch,
  $$labelDelete
} from 'Store/thunks/labels';

@autobind
export class LabelsList extends Component {
  static propTypes = {
    labels: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onFetchData({ page }) {
    $$labelsFetch(this.props.dispatch, page + 1);
  }

  onDelete({ value }) {
    const { fullName } = value;
    const { dispatch } = this.props;
    this.prompt.show({
      body: `Do you really want to delete label ${fullName}?`,
      onConfirm: close => $$labelDelete(dispatch, value, close)
    });
  }

  render() {
    const { labels, loading } = this.props;

    const columns = [
      {
        Header: 'Id',
        accessor: 'id',
        width: 116,
      }, {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'Actions',
        accessor: '',
        width: 262,
        sortable: false,
        Cell: (rowData) => {
          const editLink = `/labels/${rowData.value.id}`;
          return <ActionsCell editLink={editLink} rowData={rowData} onDelete={this.onDelete} />;
        }
      }
    ];

    const breadcrumbs = [
      { pageName: 'Labels', pageLink: '/labels/list', iconCls: 'fa fa-tags' }
    ];

    return (
      <div>
        <ContentHeader title="Labels" breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="">
          <div className="box-header clearfix">
            <Link to="/labels" className="btn btn-success btn-xs pull-right">
              <i className="fa fa-plus" /> Add label
            </Link>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-sm-12">
                <AlertMessage />
                <ErrorMessage />
                <ReactTable
                  manual
                  className="-striped"
                  columns={columns}
                  data={labels.list}
                  pages={labels.lastPage}
                  loading={loading}
                  defaultPageSize={15}
                  onFetchData={this.onFetchData}
                  PaginationComponent={Pagination}
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

const mapStateToProps = ({ labels, loading }) => ({ labels, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LabelsList);
