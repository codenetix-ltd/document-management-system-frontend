import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import isEmpty from 'lodash/isEmpty';

import ReactTable from 'react-table';

import { DataCheckbox as Checkbox } from 'Components/common/dataControls';

@autobind
export default class SelectableTable extends Component {
  static defaultProps = {
    onSelect: () => {}
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onSelect: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      selectedRows: []
    };
  }

  /**
   * When table data changes, maps it to selectedRows state adding checked field
   * Used to be able to select/unselect all rows right after the first render
   * @param nextProps
   */
  componentWillReceiveProps({ data }) {
    const { selectedRows } = this.state;
    if (isEmpty(selectedRows) && !isEmpty(data)) {
      const initial = data.map(item => ({ value: item, checked: false }));
      this.setState({
        selectedRows: [...initial, ...this.state.selectedRows]
      });
    }
  }

  /**
   * on row click handler added through getTrProps prop of react-table
   * @param state - table's internal state
   * @param rowInfo - table's data item related to current row
   * @returns {{onClick: function(*=, *=)}}
   */
  getTrProps(state, rowInfo) {
    return {
      onClick: (e, handleOriginal) => {
        this.toggleCheckRow(e, rowInfo);
        if (handleOriginal) handleOriginal();
      }
    };
  }

  /**
   * Selects all visible rows
   */
  toggleCheckAll() {
    const { allChecked, selectedRows } = this.state;
    const selected = selectedRows.map(item => ({ ...item, checked: !allChecked }));
    this.setState({
      allChecked: !allChecked,
      selectedRows: selected
    });
    const picked = selected.filter(({ checked }) => checked).map(({ value }) => value);
    this.props.onSelect(picked);
  }

  /**
   * Selects a single row
   * @param e - row click event or checkbox change event, unused here
   * @param rowData - table's data item related to current row
   */
  toggleCheckRow(e, rowData) {
    const { viewIndex } = rowData;
    const selectedRows = [...this.state.selectedRows];
    const { checked: flag } = selectedRows[viewIndex];
    selectedRows[viewIndex] = {
      ...selectedRows[viewIndex],
      checked: !flag
    };
    this.setState({ selectedRows });
    const picked = selectedRows.filter(({ checked }) => checked).map(({ value }) => value);
    this.props.onSelect(picked);
  }

  render() {
    const checkboxColumn = {
      Header: rowData => {
        const { allChecked } = this.state;
        return <Checkbox data={rowData} checked={allChecked} onChange={this.toggleCheckAll} />;
      },
      accessor: '',
      maxWidth: 50,
      sortable: false,
      Cell: rowData => {
        const { viewIndex } = rowData;
        const { selectedRows } = this.state;
        const { checked } = selectedRows[viewIndex] || {};
        return <Checkbox data={rowData} checked={checked} onChange={this.toggleCheckRow} />;
      }
    };

    const { columns } = this.props;
    columns.unshift(checkboxColumn);

    return (
      <ReactTable
        columns={columns}
        getTrProps={this.getTrProps}
        {...this.props}
      />
    );
  }
}
