import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import InputFilter from 'Components/common/filters/Input';
import SelectFilter from 'Components/common/filters/Select';
import DatePicker from 'Components/common/filters/DatePicker';
import CheckboxFilter from 'Components/common/filters/Checkbox';

import { $documentsFilter } from 'Store/actions';
import { $$documentsFetch } from 'Store/thunks/documents';
import { $$templatesFetch } from 'Store/thunks/templates';

@autobind
export class FiltersWrapper extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    documents: PropTypes.any.isRequired,
    templates: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      templateOptions: []
    };
  }

  componentDidMount() {
    $$templatesFetch(this.props.dispatch, 1);
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps.templates;
    if (list.length) {
      this.setState({
        templateOptions: list.map(({ id, name }) => ({
          value: id, label: name
        }))
      });
    }
  }

  onFilterChange(filterType, value) {
    const { dispatch, documents } = this.props;
    const {
      page,
      sortField,
      sortDirection
    } = documents;
    if (Array.isArray(value)) {
      value = value.map(item => item.value).join(','); // eslint-disable-line
    }
    dispatch($documentsFilter({
      [`filter[${filterType}]`]: value
    }));
    setTimeout(() => {
      const { documents: docs } = this.props;
      $$documentsFetch(dispatch, {
        page, sortField, sortDirection, filterSet: docs.filterSet
      });
    }, 1);
  }

  render() {
    const { templateOptions } = this.state;
    return (
      <div className="document-filters-wrapper datatables-filters-wrapper">
        <div className="document-filters datatables-filters">
          <div className="row">

            <div className="form-group col-lg-1 col-md-4 col-sm-6">
              <InputFilter label="ID" filterType="id" placeholder="Id" onChange={this.onFilterChange} />
            </div>

            <div className="form-group col-lg-3 col-md-4 col-sm-6">
              <InputFilter label="Name" filterType="name" placeholder="Document name" onChange={this.onFilterChange} />
            </div>

            <div className="form-group col-lg-2 col-md-4 col-sm-6">
              <InputFilter label="Owner" filterType="owner" placeholder="Username" onChange={this.onFilterChange} />
            </div>

            <div className="form-group col-lg-2 col-md-4 col-sm-6">
              <SelectFilter
                label="Template"
                filterType="template"
                options={templateOptions}
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-2 col-md-4 col-sm-6">
              <SelectFilter
                label="Labels"
                filterType="label"
                options={templateOptions}
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-3 col-md-6 col-sm-6">
              <DatePicker
                label="Created at"
                filterType="createdAt.from"
                placeholder="Date from"
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-2 col-md-6 col-sm-6">
              <DatePicker
                filterType="createdAt.to"
                placeholder="Date to"
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-3 col-md-6 col-sm-6">
              <DatePicker
                label="Updated at"
                filterType="updatedAt.from"
                placeholder="Date from"
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-2 col-md-6 col-sm-6">
              <DatePicker
                filterType="updatedAt.to"
                placeholder="Date to"
                onChange={this.onFilterChange}
              />
            </div>

            <div className="form-group col-lg-1 col-md-2 col-sm-2">
              <CheckboxFilter
                label="Archived"
                onChange={this.onFilterChange}
                filterType="archived"
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ documents, templates }) => ({ documents, templates });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FiltersWrapper);
