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
  $$rolesFetch,
  $$roleDelete
} from 'Store/thunks/roles';

@autobind
export class RolesList extends Component {
  static propTypes = {
    roles: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onFetchData({ page }) {
    $$rolesFetch(this.props.dispatch, page + 1);
  }

  onDelete({ value }) {
    const { fullName } = value;
    const { dispatch } = this.props;
    this.prompt.show({
      body: `Do you really want to delete role ${fullName}?`,
      onConfirm: close => $$roleDelete(dispatch, value, close)
    });
  }

  columns = [
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
        const editLink = `/roles/${rowData.value.id}`;
        return <ActionsCell editLink={editLink} rowData={rowData} onDelete={this.onDelete} />;
      }
    }
  ];

  breadcrumbs = [
    { pageName: 'Roles', pageLink: '/roles/list', iconCls: 'fa fa-tags' }
  ];

  render() {
    const { roles, loading } = this.props;
    return (
      <div>
        <ContentHeader title="Roles" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="">
          <div className="box-header clearfix">
            <Link to="/roles" className="btn btn-success btn-xs pull-right">
              <i className="fa fa-plus" /> Add role
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
                  columns={[...this.columns]}
                  data={roles.list}
                  pages={roles.lastPage}
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

const mapStateToProps = ({ roles, loading }) => ({ roles, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
