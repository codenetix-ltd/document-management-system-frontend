import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import isNull from 'lodash/isNull';

import {
  DataInput as Input,
  DataCheckbox as Checkbox
} from 'Components/common/dataControls';

import { $updateAttributeValues } from 'Store/actions';

@autobind
export class AttributesForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    document: PropTypes.any.isRequired,
    types: PropTypes.array.isRequired
  };

  onAttrChange({ target }, data) {
    const { id, typeId } = data;
    const { value } = target;
    const { dispatch } = this.props;
    const { machineName } = this.getType(typeId);
    dispatch($updateAttributeValues([{ id, value, type: machineName }]));
  }

  onCheckboxToggle(e, data) {
    const { id, typeId } = data;
    const { dispatch, document: { actualVersion: { attributeValues } } } = this.props;
    const found = attributeValues.find(at => at.id === id);
    const value = found ? found.value : false;
    const { machineName } = this.getType(typeId);
    dispatch($updateAttributeValues([{ id, value: !value, type: machineName }]));
  }

  getType(typeId) {
    return this.props.types.find(type => type.id === typeId);
  }

  render() {
    const { document: { actualVersion } } = this.props;
    const { attributeValues: attrValues, template } = actualVersion;
    return (
      <table className="table table-bordered table-view-document">
        <tbody>
          {
            template.attributes.map((attr, index) => {
              const type = this.getType(attr.typeId);
              if (type.machineName === 'table') {
                const { headers: cols, rows } = attr.data;
                return (
                  <tr key={index}>
                    <td>{attr.name}</td>
                    <td>
                      <table className="table table-bordered table-as-value">
                        <tbody>
                          <tr>
                            <td>&nbsp;</td>
                            {cols.map(({ name }, i) => <td key={i}><b>{name}</b></td>)}
                          </tr>
                          {
                            rows.map(({ name, columns }, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{name}</td>
                                  {
                                    columns.map((cell, i) => {
                                      const found = attrValues.find(at => at.id === cell.id);
                                      const cellType = this.getType(cell.typeId);
                                      const value = found ? found.value : null;
                                      if (cellType.machineName === 'boolean') {
                                        const checked = isNull(value) ? false : value;
                                        return (
                                          <td key={i}>
                                            <Checkbox data={cell} onChange={this.onCheckboxToggle} checked={checked} />
                                          </td>
                                        );
                                      }
                                      const val = isNull(value) ? '' : value;
                                      return (
                                        <td key={i}>
                                          <Input data={cell} onChange={this.onAttrChange} value={val} />
                                        </td>
                                      );
                                    })
                                  }
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              } else if (type.machineName === 'boolean') {
                const found = attrValues.find(at => at.id === attr.id);
                const val = found ? found.value : false;
                return (
                  <tr key={index}>
                    <td>{attr.name}</td>
                    <td>
                      <Checkbox
                        data={attr}
                        onChange={this.onCheckboxToggle}
                        checked={val}
                      />
                    </td>
                  </tr>
                );
              }
              const found = attrValues.find(at => at.id === attr.id);
              const val = found ? found.value : '';
              return (
                <tr key={index}>
                  <td>{attr.name}</td>
                  <td><Input data={attr} onChange={this.onAttrChange} value={val} /></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ document, types }) => ({ document, types });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributesForm);
