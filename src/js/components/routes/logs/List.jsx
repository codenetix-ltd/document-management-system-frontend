import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import moment from 'moment';
import first from 'lodash/first';

import ReactTable from 'react-table';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import Pagination from 'Components/partials/Pagination';

import AlertMessage from 'Components/common/AlertMessage';
import ErrorMessage from 'Components/common/ErrorMessage';

import { $$logsFetch } from 'Store/thunks/logs';

import FiltersWrapper from './partials/FiltersWrapper';

@autobind
export class LogsList extends Component {
  static propTypes = {
    logs: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

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
    $$logsFetch(dispatch, {
      page: page + 1,
      orderBy,
      sortedBy
    });
  }

  columns = [
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
      Cell: ({ value }) => {
        if (value) {
          return (
            <Link to={value.url}>{value.title}</Link>
          );
        }
        return <span />;
      }
    }, {
      Header: 'Type',
      accessor: 'type'
    }, {
      Header: 'Created at',
      accessor: 'createdAt',
      Cell: ({ value }) => moment.unix(value).format('YYYY/MM/DD')
    }
  ];

  breadcrumbs = [
    { pageName: 'Logs list', pageLink: '/logs/list', iconCls: 'fa fa-list' }
  ];

  render() {
    const { logs, loading } = this.props;
    return (
      <div>
        <ContentHeader title="Logs" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-success">
          <div className="box-body">
            <FiltersWrapper />
            <hr />
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <AlertMessage />
                  <ErrorMessage />
                  <ReactTable
                    manual
                    className="-striped"
                    columns={[...this.columns]}
                    data={logs.list}
                    pages={logs.lastPage}
                    loading={loading}
                    onFetchData={this.onFetchData}
                    defaultPageSize={15}
                    PaginationComponent={Pagination}
                    multiSort={false}
                    resizable={false}
                    minRows={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ logs, loading }) => ({ logs, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LogsList);
