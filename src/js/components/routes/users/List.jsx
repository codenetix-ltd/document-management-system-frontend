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
  $$usersFetch,
  $$userDelete
} from 'Store/thunks/users';

@autobind
export class UsersList extends Component {
  static propTypes = {
    users: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onFetchData({ page }) {
    $$usersFetch(this.props.dispatch, page + 1);
  }

  onDelete({ value }) {
    const { fullName } = value;
    const { dispatch } = this.props;
    this.prompt.show({
      body: `Do you really want to delete user ${fullName}?`,
      onConfirm: close => $$userDelete(dispatch, value, close)
    });
  }

  columns = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 116,
    }, {
      Header: 'Full Name',
      accessor: 'fullName',
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      Header: 'Actions',
      accessor: '',
      width: 262,
      sortable: false,
      Cell: (rowData) => {
        const editLink = `/users/${rowData.value.id}`;
        return <ActionsCell editLink={editLink} rowData={rowData} onDelete={this.onDelete} />;
      }
    }
  ];

  breadcrumbs = [
    { pageName: 'Users', pageLink: '/users/list', iconCls: 'fa fa-users' }
  ];

  render() {
    const { users, loading } = this.props;
    return (
      <div>
        <ContentHeader title="Users" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="">
          <div className="box-header clearfix">
            <Link to="/users" className="btn btn-success btn-xs pull-right">
              <i className="fa fa-plus" /> Add user
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
                  data={users.list}
                  pages={users.lastPage}
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

const mapStateToProps = ({ users, loading }) => ({ users, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
