import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import cln from 'classnames';
import Select from 'react-select';
import { If, Then } from 'qc-react-conditionals/lib';

import { DataButton as Button } from 'Components/common/dataControls';

@autobind
export default class TypeCell extends Component {
  static propTypes = {
    rowData: PropTypes.any.isRequired,
    colIndex: PropTypes.number.isRequired,
    onCellLockChange: PropTypes.func.isRequired,
    onCellTypeChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.typeOptions = [
      'String',
      'Numeric',
      'Boolean'
    ].map((name, index) => ({ id: index + 1, name }));
  }

  handleTypeChange(value) {
    const { rowData, colIndex, onCellTypeChange } = this.props;
    onCellTypeChange({ colIndex, rowIndex: rowData.viewIndex }, value);
  }

  handleLockChange(isLocked) {
    const { onCellLockChange, rowData, colIndex } = this.props;
    onCellLockChange({ colIndex, rowIndex: rowData.viewIndex, isLocked: !isLocked });
  }

  render() {
    const { rowData, colIndex } = this.props;
    const { type, isLocked } = rowData.value[`${colIndex}-${rowData.viewIndex}`];
    const selectValue = { id: type.id, name: type.name };
    const lockCls = cln('fa', { 'fa-lock': isLocked }, { 'fa-unlock': !isLocked });

    return (
      <table className="attr-type-cell">
        <tbody>
          <tr>
            <td>
              <Button cls="btn btn-xs btn-warning btn-lock-cell" data={isLocked} onClick={this.handleLockChange}>
                <i className={lockCls} />
              </Button>
            </td>
            <td>
              <If is={!isLocked}>
                <Then>
                  <Select
                    className="attr-type-select"
                    name="type"
                    value={selectValue}
                    onChange={this.handleTypeChange}
                    options={this.typeOptions}
                    clearable={false}
                    labelKey="name"
                    valueKey="id"
                  />
                </Then>
              </If>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
