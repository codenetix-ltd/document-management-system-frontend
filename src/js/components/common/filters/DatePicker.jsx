import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import DayPicker from 'react-datetime';
import { If, Then } from 'qc-react-conditionals/lib';

@autobind
export default class DatePickerFilter extends Component {
  static defaultProps = {
    label: ''
  };

  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  onDateChange(date) {
    const { onChange, filterType } = this.props;
    this.setState({ date });
    onChange(filterType, date);
  }

  onClear() {
    const { onChange, filterType } = this.props;
    this.setState({ date: null });
    onChange(filterType, null);
  }

  render() {
    const { date } = this.state;
    const { label, placeholder } = this.props;
    return (
      <div className="input-group input-group-sm">
        <If is={label}>
          <Then>
            <span className="input-group-addon">{label}:</span>
          </Then>
        </If>
        <DayPicker
          value={date}
          onChange={this.onDateChange}
          inputProps={{ placeholder }}
          timeFormat={false}
          closeOnSelect
        />
        <span className="input-group-btn">
          <button type="button" className="btn btn btn-warning btn-xs" onClick={this.onClear}>
            <i className="fa fa-eraser" />
          </button>
        </span>
      </div>
    );
  }
}
