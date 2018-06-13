import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import isBool from 'lodash/isBoolean';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';

import { Nav, NavItem } from 'react-bootstrap';

import { DataLink } from 'Components/common/dataControls';

import { $$comparedDocumentsFetch } from 'Store/thunks/documents';

@autobind
export class DocumentsCompare extends Component {
  static propTypes = {
    location: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    comparedDocuments: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      showAll: true
    };
  }

  componentDidMount() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const documentIds = params.get('documentIds');
    const ids = documentIds.split(',');
    $$comparedDocumentsFetch(this.props.dispatch, ids);
  }

  onNavClick(activeKey) {
    this.setState({ activeKey });
  }

  onFiltersClick(showAll) {
    this.setState({ showAll });
  }

  getType(typeId) {
    return this.props.types.find(type => type.id === typeId);
  }

  /**
   * Checks if a value of cellID differs in one of the docs of currentSet
   * @param currentSet - set of documents that have the same templateID
   * @param cellID - id of a cell which value should be compared within the currentSet
   * @returns {Boolean}
   */
  valueDiffers(currentSet, cellID) {
    return currentSet.some(doc => {
      const firstFound = currentSet[0].attributeValues.find(at => at.id === cellID);
      const currentFound = doc.attributeValues.find(at => at.id === cellID);
      const { value: firstVal } = firstFound || {};
      const { value: currVal } = currentFound || {};
      return firstVal !== currVal;
    });
  }

  /**
   * Merge document's actualVersion property with the top level properties
   * @param comparedDocs - set of documents to compare
   * @returns {Array}
   */
  mergeActualVersion(comparedDocs) {
    return comparedDocs.map(doc => {
      const { actualVersion, ...rest } = doc;
      return { ...actualVersion, ...rest };
    });
  }

  /**
   * Split a set of documents into groups joined by template ID
   * @param actualDocs
   * @returns {Array}
   */
  joinByTemplateID(actualDocs) {
    return actualDocs.map(doc => [doc]).reduce((acc, curr) => {
      const ids = acc.map(doc => doc[0].template.id);
      if (ids.includes(curr[0].template.id)) {
        const index = acc.findIndex(doc => doc[0].template.id === curr[0].template.id);
        return acc[index].push(curr[0]) && acc;
      }
      return acc.push(curr) && acc;
    }, []);
  }

  breadcrumbs = [
    { pageName: 'Documents list', pageLink: '/documents/list', iconCls: 'fa fa-list' },
    { pageName: 'Documents comparison', pageLink: '/compare', iconCls: '' }
  ];

  render() {
    const { activeKey, showAll } = this.state;
    const { comparedDocuments: comparedDocs } = this.props;
    const actualDocs = this.mergeActualVersion(comparedDocs);
    const joinedByTemplateID = this.joinByTemplateID(actualDocs);
    const currentSet = joinedByTemplateID[activeKey];
    const { attributes: attrs } = currentSet ? currentSet[0].template : { attributes: [] };
    return (
      <div>
        <ContentHeader title="Documents comparison" breadcrumbs={this.breadcrumbs} />
        <ContentWrapper noBox>
          <div className="box box-default">
            <div className="box-body">
              <Nav bsStyle="pills" activeKey={activeKey} onSelect={this.onNavClick}>
                {
                  joinedByTemplateID.map((docs, i) => {
                    return (
                      <NavItem key={i} eventKey={i}>{`${docs[0].template.name} (${docs.length})`}</NavItem>
                    );
                  })
                }
              </Nav>
              <p className="compare-actions">
                <span className="compare-show-style">Show only:
                  <span className="compare-show-style-item">
                    <DataLink disabled={showAll} data onClick={this.onFiltersClick}>all characteristics</DataLink>
                  </span>
                  |
                  <span className="compare-show-style-item">
                    <DataLink disabled={!showAll} data={false} onClick={this.onFiltersClick}>differences</DataLink>
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="box">
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered table-compare">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        {
                          currentSet && currentSet.map(doc => {
                            return (
                              <th key={doc.id} className="table-compare-header-cell">
                                <h2><Link to={`/documents/view/${doc.id}`}>{doc.name}</Link></h2>
                                <span>| {doc.owner.fullName}</span>
                              </th>
                            );
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        attrs.map(attr => {
                          const type = this.getType(attr.typeId);
                          if (type.machineName === 'table') {
                            const firstRow = (
                              <tr key={attr.id}>
                                <td><i className="fa fa-table" /> {attr.name}</td>
                                {currentSet.map(doc => <td key={doc.id} />)}
                              </tr>
                            );
                            const cells = [];
                            attr.data.rows.forEach(row => {
                              row.columns.forEach((col, colIndex) => {
                                cells.push({
                                  id: col.id,
                                  rowTitle: row.name,
                                  colTitle: attr.data.headers[colIndex].name
                                });
                              });
                            });
                            const rows = cells.map(cell => {
                              const valueDiffers = this.valueDiffers(currentSet, cell.id);
                              if (!this.state.showAll && !valueDiffers) return null;
                              return (
                                <tr key={cell.id} className="table-attr-row">
                                  <td>{`${cell.rowTitle} ${cell.colTitle}`}</td>
                                  {
                                    currentSet.map(doc => {
                                      const found = doc.attributeValues.find(at => at.id === cell.id);
                                      const { value } = found || { value: '-' };
                                      return <td key={doc.id}>{value}</td>;
                                    })
                                  }
                                </tr>
                              );
                            });
                            return rows.unshift(firstRow) && rows;
                          }
                          return (
                            <tr key={attr.id}>
                              <td>{attr.name}</td>
                              {
                                currentSet.map(doc => {
                                  const found = doc.attributeValues.find(at => at.id === attr.id);
                                  const { value } = found || { value: '-' };
                                  if (isBool(value)) {
                                    return <td key={doc.id}>{value ? 'Yes' : 'No'}</td>;
                                  }
                                  return <td key={doc.id}>{value}</td>;
                                })
                              }
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ comparedDocuments, types }) => ({ comparedDocuments, types });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsCompare);
