import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Select from 'react-select';
import { If, Then } from 'qc-react-conditionals/lib';

import { $$permissionGroupsFetch } from 'Store/thunks/roles';
import { $$templatesFetch } from 'Store/thunks/templates';

@autobind
export class RoleForm extends Component {
  static defaultProps = {
    role: null,
    validate: () => false
  };

  static propTypes = {
    role: PropTypes.any,
    validate: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    templates: PropTypes.any.isRequired,
    permissionGroups: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      permissionValues: [],
      templateIds: []
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    $$permissionGroupsFetch(dispatch, () => {
      $$templatesFetch(dispatch, 0);
    });
  }

  componentWillReceiveProps(nextProps) {
    const newRole = JSON.stringify(nextProps.role);
    const oldRole = JSON.stringify(this.props.role);
    if (newRole !== oldRole) {
      const { name, templateIds, permissionValues } = nextProps.role;
      this.setState({
        ...this.state,
        name,
        templateIds,
        permissionValues
      });
    }
  }

  /**
   * Handles submit event.
   * @param event
   */
  onSubmit(event) {
    event.preventDefault();
    const formData = { ...this.state };
    this.props.onSubmit(formData);
  }

  getPermissionValue(permissionID) {
    const { permissionValues } = this.state;
    const perm = permissionValues.find(({ id }) => id === permissionID);
    return perm ? perm['accessType'].id : null;
  }

  getQualifierValue(permissionID, qualifierID) {
    const { permissionValues } = this.state;
    const perm = permissionValues.find(({ id }) => id === permissionID);
    const qual = perm ? perm['qualifiers'].find(({ id }) => id === qualifierID) : null;
    return qual ? qual['accessType'].id : null;
  }

  /**
   * Universal handler for multiple input fields
   * @param event
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  /**
   * Special handler for react-select's Async component
   * @param value
   */
  handleTemplatesSelect(value) {
    const templateIds = value.map(({ id }) => id);
    this.setState({ templateIds });
  }

  render() {
    const { name, templateIds, permissionValues } = this.state;
    const {
      role,
      loading,
      templates,
      permissionGroups
    } = this.props;
    const userTemplates = templates.list.filter(({ id }) => templateIds.includes(id));
    return (
      <form onSubmit={this.onSubmit}>
        <h3>General information</h3>
        <hr />
        <div className="row">
          <div className="col-lg-5">
            <div className="form-group">
              <label htmlFor="name" className="control-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Role name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="template" className="control-label">Attached templates</label>
              <Select
                multi
                isLoading={loading}
                name="templates"
                value={userTemplates}
                onChange={this.handleTemplatesSelect}
                options={templates.list}
                labelKey="name"
                valueKey="id"
              />
            </div>
          </div>
        </div>
        <If is={permissionValues.length}>
          <Then>
            <div className="row">
              <div className="col-lg-8">
                <h3>Permissions</h3>
                <hr />
                <div id="permission-list-wrapper">
                  {
                    permissionGroups.map(group => (
                      <div key={group.id} className="permissionGroup">
                        <h4>{group.label}</h4>
                        <table className="table table-bordered table-permissions">
                          <thead>
                            <tr>
                              <th>Permission</th>
                              <th>Access type</th>
                              <th className="qualifier" />
                            </tr>
                          </thead>
                          <tbody>
                            {
                              group['permissions'].map(permission => (
                                <tr key={permission.id}>
                                  <td>{permission.label}</td>
                                  <td>
                                    <select
                                      defaultValue={this.getPermissionValue(permission.id)}
                                      name={`permission[${permission.id}]`}
                                      className="form-control input-sm"
                                    >
                                      {
                                        permission['accessTypes'].map(accessType => (
                                          <option key={accessType.id} value={accessType.id}>
                                            {accessType.label}
                                          </option>
                                        ))
                                      }
                                    </select>
                                  </td>
                                  <td className="qualifier">
                                    <div className="qualifier-wrapper">
                                      {
                                        group['qualifiers'].map(qualifier => (
                                          <div key={qualifier.id}>
                                            <span>{qualifier.label}</span>
                                            <select
                                              defaultValue={this.getQualifierValue(permission.id, qualifier.id)}
                                              name={`qualifier[${qualifier.id}]`}
                                              className="form-control input-sm"
                                            >
                                              {
                                                qualifier['accessTypes'].map(accessType => (
                                                  <option key={accessType.id} value={accessType.id}>
                                                    {accessType.label}
                                                  </option>
                                                ))
                                              }
                                            </select>
                                          </div>
                                        ))
                                      }
                                    </div>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </Then>
        </If>
        <div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={this.props.validate(this.state)}
          >
            { role ? 'Update' : 'Create' }
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ permissionGroups, templates, loading }) => ({ permissionGroups, templates, loading });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
