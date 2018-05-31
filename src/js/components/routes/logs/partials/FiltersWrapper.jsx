import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import InputFilter from 'Components/common/filters/Input';
import SelectFilter from 'Components/common/filters/Select';
import DatePicker from 'Components/common/filters/DatePicker';

import { $logsFilter } from 'Store/actions';
import { $$logsFetch } from 'Store/thunks/logs';

@autobind
export class FiltersWrapper extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    logs: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      typeOptions: []
    };
  }

  componentDidMount() {
    this.setState({
      typeOptions: [
        { value: 1, label: 'user' },
        { value: 2, label: 'document' },
        { value: 3, label: 'template' },
        { value: 4, label: 'label' }
      ]
    });
  }

  onFilterChange(filterType, value) {
    const { dispatch, logs } = this.props;
    const {
      page,
      orderBy,
      sortedBy
    } = logs;
    if (Array.isArray(value)) {
      value = value.map(item => item.value).join(','); // eslint-disable-line
    }
    dispatch($logsFilter({
      [`filter[${filterType}]`]: value
    }));
    setTimeout(() => {
      const { logs: _logs } = this.props;
      $$logsFetch(dispatch, {
        page, orderBy, sortedBy, filterSet: _logs.filterSet
      });
    }, 1);
  }

  render() {
    return (
      <div className="datatables-filters-wrapper">
        <div className="datatables-filters">
          <div className="row">
            <div className="form-group col-md-2">
              <div className="input-group">
                <InputFilter label="ID" onChange={this.onFilterChange} filterType="id" placeholder="Id" />
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="input-group">
                <InputFilter label="User" onChange={this.onFilterChange} filterType="user" placeholder="User" />
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="input-group">
                <InputFilter label="Action" onChange={this.onFilterChange} filterType="action" placeholder="Action" />
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="input-group input-group-sm">
                <SelectFilter
                  label="Type"
                  onChange={this.onFilterChange}
                  options={this.state.typeOptions}
                  filterType="type"
                />
              </div>
            </div>

            <div className="form-group col-md-2">
              <div className="input-group input-group-sm">
                <DatePicker
                  label="Created at"
                  onChange={this.onFilterChange}
                  filterType="createdAt.from"
                  placeholder="From"
                />
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="input-group input-group-sm">
                <DatePicker
                  onChange={this.onFilterChange}
                  filterType="createdAt.to"
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ logs, templates }) => ({ logs, templates });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FiltersWrapper);
