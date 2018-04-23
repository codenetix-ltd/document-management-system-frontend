import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

@autobind
export default class LabelForm extends Component {
  static defaultProps = {
    label: null,
    submitButtonText: 'Create',
    validate: () => false
  };

  static propTypes = {
    label: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    validate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.label !== this.props.label) {
      this.setState({ ...this.state, ...nextProps.label });
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

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-6">
              <input
                className="form-control"
                placeholder="Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.props.validate(this.state)}
          >
            {this.props.submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}
