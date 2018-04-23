import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  $$templatesFetch,
  $$templateDelete
} from 'Store/thunks/templates';

@autobind
export class TemplatesList extends Component {
  static propTypes = {
    templates: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onFetchData({ page }) {
    $$templatesFetch(this.props.dispatch, page + 1);
  }

  onDelete({ value }) {
    const { name } = value;
    const { dispatch } = this.props;
    this.prompt.show({
      body: `Do you really want to delete template ${name}?`,
      onConfirm: close => $$templateDelete(dispatch, value, close)
    });
  }

  render() {
    const columns = [
      {
        Header: 'Id',
        accessor: 'id',
        width: 250,
      }, {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'Actions',
        accessor: '',
        width: 262,
        sortable: false,
        Cell: (rowData) => {
          const editLink = `/templates/${rowData.value.id}`;
          return <ActionsCell editLink={editLink} rowData={rowData} onDelete={this.onDelete} />;
        },
      },
    ];

    const breadcrumbs = [
      { pageName: 'Templates', pageLink: '/templates/list', iconCls: 'fa fa-copy' }
    ];

    return (
      <div>
        <ContentHeader title="Templates" breadcrumbs={breadcrumbs} />
        <ContentWrapper boxClass="">
          <div className="box-header clearfix">
            <Link to="/users" className="btn btn-success btn-xs pull-right">
              <i className="fa fa-plus" /> Add template
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
                  data={this.props.templates.list}
                  pages={this.props.templates.lastPage}
                  loading={this.props.loading}
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

const mapStateToProps = ({ templates, loading }) => ({ templates, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesList);
