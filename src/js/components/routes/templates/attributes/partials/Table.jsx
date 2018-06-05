import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import ReactTable from 'react-table';

import {
  DataInput as Input,
  DataButton as Button
} from 'Components/common/dataControls';

import { $$attributeUpdate } from 'Store/thunks/attributes';

import TypeCell from './TypeCell';
import initialTable from './table-data-initial.json';
import getTpl from './table-data-defaults';


@autobind
export class AttributesTable extends Component {
  static propTypes = {
    attribute: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      columnsConfig: [],
      data: []
    };
  }

  componentDidMount() {
    const { attribute } = this.props;
    const { headers, rows } = attribute.data || initialTable;
    this.generateTableData(headers, rows);
  }

  onCellTypeChange({ colIndex, rowIndex }, value) {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    rows[rowIndex].columns[colIndex].type = {
      ...value,
      machineName: value.name.toLowerCase()
    };
    this.generateTableData(headers, rows);
  }

  onCellLockChange({ colIndex, rowIndex, isLocked }) {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    rows[rowIndex].columns[colIndex].isLocked = isLocked;
    this.generateTableData(headers, rows);
  }

  onColumnTitleChange(event, index) {
    const { value } = event.target;
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    headers[index].name = value;
    this.generateTableData(headers, rows);
  }

  onRowTitleChange(event, { viewIndex }) {
    const { value } = event.target;
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    rows[viewIndex].name = value;
    this.generateTableData(headers, rows);
  }

  onColumnAdd() {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    headers.push(getTpl('column'));
    const newRows = rows.map(row => {
      const r = { ...row };
      r.headers = [...row.headers, getTpl('columnData')];
      return r;
    });
    this.generateTableData(headers, newRows);
  }

  onColumnDelete({ indexToRemove }) {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    headers.splice(indexToRemove, 1);
    const newRows = rows.map(row => {
      row.columns.splice(indexToRemove, 1);
      return row;
    });
    this.generateTableData(headers, newRows);
  }

  onRowAdd() {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    const cols = Array.from({ length: headers.length }, () => getTpl('columnData'));
    rows.push({
      name: 'Enter title',
      columns: cols
    });
    this.generateTableData(headers, rows);
  }

  onRowDelete({ viewIndex }) {
    const { attribute } = this.props;
    const { headers, rows } = { ...attribute.data };
    rows.splice(viewIndex, 1);
    this.generateTableData(headers, rows);
  }

  generateTableData(headers, rows) {
    const { dispatch } = this.props;
    $$attributeUpdate(dispatch, { data: { headers, rows } });

    // data passed to every table cell
    const data = rows.map((row, rowIndex) => {
      const cell = { rowTitle: row.name };
      row.columns.forEach((col, colIndex) => {
        cell.isTypeCell = true;
        // cell.colTitle = columns[colIndex].name; // todo: probably this field is redundant
        cell[`${colIndex}-${rowIndex}`] = col; // unique id to access this cell's data
      });
      return cell;
    });

    data.push({}); // last row with remove buttons

    const extendedColumns = [...headers];
    extendedColumns.unshift({ name: 'rowTitle' }); // row title column
    extendedColumns.push({ name: 'lastColumn' }); // column for remove buttons

    const columnsConfig = extendedColumns.map((col, colIdx) => {
      if (col.name === 'rowTitle') {
        return {
          Header: () => <span />,
          accessor: '',
          width: 195,
          className: 'input-as-text',
          Cell: rowData => {
            if (rowData.viewIndex !== rows.length) {
              return (
                <Input debounce data={rowData} value={rowData.value.rowTitle} onChange={this.onRowTitleChange} />
              );
            }
            return <span />;
          }
        };
      }
      if (col.name === 'lastColumn') {
        return {
          Header: () => <span />,
          accessor: '',
          width: 40,
          className: 'attr-remove-cell',
          Cell: rowData => {
            if (rowData.viewIndex !== rows.length) {
              return (
                <Button data={rowData} cls="btn btn-xs btn-danger" onClick={this.onRowDelete}>
                  <i className="fa fa-trash" />
                </Button>
              );
            }
            return <span />;
          }
        };
      }
      return {
        Header: () => <Input debounce data={colIdx - 1} value={col.name} onChange={this.onColumnTitleChange} />,
        headerClassName: 'input-as-text',
        accessor: '',
        width: 195,
        Cell: rowData => {
          if (rowData.value.isTypeCell) {
            return (
              <TypeCell
                rowData={rowData}
                colIndex={colIdx - 1}
                onCellLockChange={this.onCellLockChange}
                onCellTypeChange={this.onCellTypeChange}
              />
            );
          }
          return (
            <Button cls="btn btn-xs btn-danger" data={{ indexToRemove: colIdx - 1 }} onClick={this.onColumnDelete}>
              <i className="fa fa-trash" />
            </Button>
          );
        }
      };
    });

    this.setState({ data, columnsConfig });
  }

  render() {
    return (
      <div className="table-type-builder-wrapper">
        <div className="table-type-builder-actions">
          <Button cls="btn btn-add-column btn-success btn-sm" onClick={this.onColumnAdd}>Add column</Button>
          &nbsp;
          <Button cls="btn btn-add-row btn-success btn-sm" onClick={this.onRowAdd}>Add row</Button>
        </div>
        <ReactTable
          columns={this.state.columnsConfig}
          data={this.state.data}
          minRows={1}
          showPagination={false}
          sortable={false}
          resizable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ attribute }) => ({ attribute });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributesTable);
