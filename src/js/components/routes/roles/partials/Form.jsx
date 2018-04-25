import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { $$permissionGroupsFetch } from 'Store/thunks/roles';

@autobind
export class RoleForm extends Component {
  static defaultProps = {
    role: null
  };

  static propTypes = {
    role: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
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
    $$permissionGroupsFetch(dispatch);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.role !== this.props.role) {
      this.setState({ ...this.state, ...nextProps.role });
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

  /**
   * Universal handler for multiple input fields
   * @param event
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  handleTemplatesChange() {}

  render() {
    const { name } = this.state;
    const { permissionGroups } = this.props;

    return (
      <form>
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
              <select id="template" name="template" className="form-control input-sm">
                <option value="11" selected="">Template with attribute of type boolean</option>
              </select>
            </div>
          </div>
        </div>
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
                                <select name="access_type[1]" className="form-control input-sm">
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
                                    group['qualifiers'].filter(q => q.id === permission.id).map(qualifier => (
                                      <div key={qualifier.id}>
                                        <span>{qualifier.label}</span>
                                        <select name="qualifier[1][2]" className="form-control input-sm">
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
            <div>
              <button type="submit" className="btn btn-success">Update</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ permissionGroups }) => ({ permissionGroups });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
