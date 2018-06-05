import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { If, Then } from 'qc-react-conditionals/lib';
import Select from 'react-select';

import { DataInput as Input } from 'Components/common/dataControls';
import AttributesTable from 'Routes/templates/attributes/partials/Table';

import {
  $$attributeUpdate,
  $$attributeReset
} from 'Store/thunks/attributes';

@autobind
export class AttributeForm extends Component {
  static defaultProps = {
    submitButtonText: 'Create'
  };

  static propTypes = {
    types: PropTypes.array.isRequired,
    attribute: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string
  };

  componentWillUnmount() {
    $$attributeReset(this.props.dispatch);
  }

  onSubmit(e) {
    e.preventDefault();
    const { attribute } = this.props;
    const { name, type, data } = { ...attribute };
    this.props.onSubmit({
      name,
      typeId: type.id,
      data
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

  render() {
    const { attribute, types } = this.props;
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
                name="type"
                value={attribute.type}
                onChange={this.handleSelectChange}
                options={types}
                valueKey="id"
                labelKey="name"
              />
            </div>
          </div>
          <If is={attribute.type && attribute.type.name === 'Table'}>
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
          <button className="btn btn-success" type="submit">
            {this.props.submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ attribute, types }) => ({ attribute, types });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
