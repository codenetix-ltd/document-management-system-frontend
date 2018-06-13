import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import getFileURL from 'Utils/getFileURL';

export class DocumentViewContent extends Component {
  static propTypes = {
    document: PropTypes.any.isRequired,
    types: PropTypes.any.isRequired
  };

  getType(typeId) {
    return this.props.types.find(type => type.id === typeId);
  }

  render() {
    const { document, document: { actualVersion } } = this.props;
    const { attributeValues: attrValues, template } = actualVersion;
    return (
      <div>
        <h2 className="page-header">General information</h2>
        <table className="table table-striped table-view-document">
          <tbody>
            <tr>
              <td>Document name</td>
              <td>{actualVersion.name}</td>
            </tr>
            <tr>
              <td>Version name</td>
              <td>{document.version || document.id}</td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>{document.owner && document.owner.fullName}</td>
            </tr>
            <tr>
              <td>Template</td>
              <td>{actualVersion.template && actualVersion.template.name}</td>
            </tr>
            <tr>
              <td>Labels</td>
              <td>{actualVersion.labels && actualVersion.labels.map(l => l.name).join(', ')}</td>
            </tr>
            <tr>
              <td>Files</td>
              <td>
                {
                  actualVersion.files && actualVersion.files.map(file => {
                    const url = getFileURL(file.url);
                    return (
                      <a key={file.id} href={url} target="_blank">{file.name}&nbsp;</a>
                    );
                  })
                }
              </td>
            </tr>
            <tr>
              <td>Comment</td>
              <td>{actualVersion.comment}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{moment.unix(document['createdAt']).format('YYYY-MM-DD HH:MM:SS')}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="page-header">Attributes</h2>
        <table className="table table-bordered table-view-document">
          <tbody>
            {
              template && template.attributes.map((attr, index) => {
                const type = this.getType(attr.typeId);
                const { value } = attrValues.find(({ id }) => id === attr.id) || { value: '' };
                if (type.machineName === 'table') {
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
                                        const { value: val } = attrValues.find(({ id }) => id === col.id);
                                        return <td key={i}>{val}</td>;
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
                  return (
                    <tr key={index}>
                      <td>{attr.name}</td>
                      <td>{value ? 'Yes' : 'No'}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={index}>
                    <td>{attr.name}</td>
                    <td>{value}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ document, types }) => ({ document, types });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewContent);
