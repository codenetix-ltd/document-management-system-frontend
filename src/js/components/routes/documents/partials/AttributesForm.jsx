import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {
  DeviationInput,
  DataInput as Input,
  DataCheckbox as Checkbox
} from 'Components/common/dataControls';

import { $updateAttributeValues } from 'Store/actions';

@autobind
export class AttributesForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    document: PropTypes.any.isRequired
  };

  onAttrChange({ target }, data) {
    const { id } = data;
    const { value } = target;
    const { dispatch } = this.props;
    dispatch($updateAttributeValues([{ id, value }]));
  }

  onCheckboxToggle(e, data) {
    const { id } = data;
    const { dispatch, document: { actualVersion: { attributeValues } } } = this.props;
    const found = attributeValues.find(at => at.id === id);
    const value = found ? found.value : false;
    dispatch($updateAttributeValues([{ id, value: !value }]));
  }

  render() {
    const { document: { actualVersion } } = this.props;
    const { attributeValues: attrValues, template } = actualVersion;
    return (
      <table className="table table-bordered table-view-document">
        <tbody>
          {
            template.attributes.map((attr, index) => {
              if (attr.typeId === 5) {
                const { columns: cols, rows } = attr.data;
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
                                    columns.map((col, i) => {
                                      const found = attrValues.find(at => at.id === col.id);
                                      const val = found ? found.value : '';
                                      return (
                                        <td key={i}>
                                          <Input data={col} onChange={this.onAttrChange} value={val} />
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
              } else if (attr.typeId === 1) {
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
              } else if (attr.typeId === 2) {
                const found = attrValues.find(at => at.id === attr.id);
                const val = found ? found.value : '';
                return (
                  <tr key={index}>
                    <td>{attr.name}</td>
                    <td><DeviationInput data={attr} onChange={this.onAttrChange} value={val} /></td>
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

const mapStateToProps = ({ document }) => ({ document });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributesForm);
