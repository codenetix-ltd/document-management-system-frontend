import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Link, Redirect } from 'react-router-dom';
import { If, Then } from 'qc-react-conditionals/lib';

import AttributesList from 'Routes/templates/partials/AttributesListSortable';

import {
  $$templateFetch,
  $$templateUpdate,
  $$templateReset
} from 'Store/thunks/templates';

import { API } from 'Config';

@autobind
export class TemplateForm extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    submitButtonText: 'Create',
    validate: () => false
  };

  static propTypes = {
    match: PropTypes.any,
    template: PropTypes.any.isRequired,
    attributes: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    validate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { newTemplateID: false };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { templateID } = match.params;
    if (templateID) {
      $$templateFetch(dispatch, templateID);
    }
  }

  componentWillUnmount() {
    $$templateReset(this.props.dispatch);
  }

  onSubmit(event) {
    event.preventDefault();
    const { templateID } = this.props.match.params;
    const { name } = this.props.template;
    const { list } = this.props.attributes;
    const formData = {
      name,
      orderOfAttributes: list.map(item => item.id)
    };
    if (templateID) {
      axios.put(`${API.templates}/${templateID}`, formData).catch(err => {
        throw err;
      });
    } else {
      axios.post(API.templates, formData).then(({ data }) => {
        if (!data.id) throw new Error('response has no id field');
        this.setState({
          newTemplateID: data.id
        });
      }).catch(err => {
        throw err;
      });
    }
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    const { dispatch } = this.props;
    $$templateUpdate(dispatch, {
      [name]: value
    });
  }

  render() {
    const { templateID } = this.props.match.params;
    const { template } = this.props;

    if (this.state.newTemplateID) {
      return (
        <Redirect to={`/templates/${this.state.newTemplateID}`} />
      );
    }

    return (
      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-6">
              <input
                id="name"
                className="form-control"
                placeholder="Template name"
                type="text"
                name="name"
                value={template.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <If is={templateID}>
            <Then>
              <div className="form-group">
                <label className="col-sm-2 control-label">Attributes</label>
                <div className="col-sm-6">
                  <AttributesList templateID={templateID} prompt={this.prompt} />
                  <Link className="btn btn-primary pull-right btn-sm" to={`/templates/${templateID}/attributes`}>
                    <i className="fa fa-plus" /> Add attribute
                  </Link>
                </div>
              </div>
            </Then>
          </If>
        </div>
        <div className="box-footer">
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.props.validate(template)}
          >
            {this.props.submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ template, attributes }) => ({ template, attributes });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
