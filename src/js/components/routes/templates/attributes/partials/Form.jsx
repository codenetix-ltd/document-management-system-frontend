import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { If, Then } from 'qc-react-conditionals/lib';
import { Async as Select } from 'react-select';

import { DataInput as Input } from 'Components/common/dataControls';
import AttributesTable from 'Routes/templates/attributes/partials/Table';

import {
  $$attributeUpdate,
  $$attributeReset
} from 'Store/thunks/attributes';

import { $$typesFetch } from 'Store/thunks/types';

@autobind
export class AttributeForm extends Component {
  static defaultProps = {
    submitButtonText: 'Create',
    validate: () => false
  };

  static propTypes = {
    attribute: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    validate: PropTypes.func
  };

  componentWillUnmount() {
    $$attributeReset(this.props.dispatch);
  }

  onSubmit(e) {
    e.preventDefault();
    const { attribute } = this.props;
    const { name, type } = { ...attribute };
    this.props.onSubmit({
      name,
      typeId: type.id
    });
  }

  handleChange(e) {
    const { value, name } = e.target;
    const { dispatch } = this.props;
    $$attributeUpdate(dispatch, { [name]: value });
  }

  handleSelectChange(type) {
    const { dispatch } = this.props;
    $$attributeUpdate(dispatch, { type });
  }

  loadTypes(input, callback) {
    $$typesFetch(this.props.dispatch, 1, ({ data }) => {
      callback(null, {
        options: data
      });
    });
  }

  render() {
    const { attribute } = this.props;
    return (
      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-6">
              <Input
                debounce
                id="name"
                name="name"
                type="text"
                cls="form-control"
                value={attribute.name}
                placeholder="Attribute name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="type" className="col-sm-2 control-label">Type</label>
            <div className="col-sm-6">
              <Select
                autoload
                name="type"
                value={attribute.type}
                onChange={this.handleSelectChange}
                loadOptions={this.loadTypes}
                valueKey="id"
                labelKey="name"
              />
            </div>
          </div>
          <If is={attribute.type && attribute.type.id === 4}>
            <Then>
              <div className="form-group form-group-table">
                <label className="col-sm-2 control-label">Table definition</label>
                <div className="col-sm-10">
                  <AttributesTable />
                </div>
              </div>
            </Then>
          </If>
        </div>
        <div className="box-footer">
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.props.validate(attribute)}
          >
            {this.props.submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ attribute }) => ({ attribute });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
