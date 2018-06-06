import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Async as Select } from 'react-select';
import { If, Then } from 'qc-react-conditionals/lib';
import pick from 'lodash/pick';

import FileUpload from 'Components/common/FileUpload';
import FormError from 'Components/common/FormError';

import {
  $$documentUpdate,
  $$documentReset
} from 'Store/thunks/documents';
import { $$templatesFetch } from 'Store/thunks/templates';
import { $$labelsFetch } from 'Store/thunks/labels';
import { $setAttributeValues } from 'Store/actions';
import { $$errorsReset, $$errorsUpdate } from 'Store/thunks/errors';

@autobind
export class DocumentForm extends Component {
  static propTypes = {
    profile: PropTypes.any.isRequired,
    document: PropTypes.any.isRequired,
    templates: PropTypes.any.isRequired,
    labels: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    $$errorsReset(dispatch);
    $$documentReset(dispatch);
  }

  getLabelOptions(input, callback) {
    $$labelsFetch(this.props.dispatch, 1, () => {
      const { list } = this.props.labels;
      callback(null, { options: list, complete: true });
    });
  }

  getTemplateOptions(input, callback) {
    $$templatesFetch(this.props.dispatch, 1, () => {
      const { list } = this.props.templates;
      callback(null, { options: list, complete: true });
    });
  }

  getEmptyOptions(input, callback) {
    callback(null, { options: [] });
  }

  handleChange({ target }) {
    const { dispatch } = this.props;
    const { name, value, dataset } = target;
    $$documentUpdate(dispatch, {
      [name]: value
    });
    if (dataset.field) {
      $$errorsUpdate(dispatch, {
        [dataset.field]: ''
      });
    }
  }

  handleLabelsSelect(value) {
    $$documentUpdate(this.props.dispatch, {
      labels: value
    });
  }

  handleTemplateSelect(value) {
    const { dispatch } = this.props;
    dispatch($setAttributeValues([]));
    $$documentUpdate(dispatch, { template: value });
    $$errorsUpdate(dispatch, { 'actualVersion.templateId': '' });
  }

  handleFileUpload(fileIds) {
    $$documentUpdate(this.props.dispatch, { fileIds });
  }

  render() {
    const { document, document: { actualVersion }, profile } = this.props;
    return (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Document name"
                value={actualVersion.name}
                onChange={this.handleChange}
                data-field="actualVersion.name"
              />
              <FormError field="actualVersion.name" />
            </div>
          </div>
          <If is={document.version}>
            <Then>
              <div className="form-group">
                <label htmlFor="version" className="col-sm-2 control-label">Actual version</label>
                <div className="col-sm-6">
                  <Select
                    name="version"
                    value={{ id: 1, name: document.version }}
                    disabled
                    labelKey="name"
                    valueKey="id"
                    loadOptions={this.getEmptyOptions}
                  />
                </div>
              </div>
            </Then>
          </If>
          <div className="form-group">
            <label htmlFor="template" className="col-sm-2 control-label">Template</label>
            <div className="col-sm-6">
              <Select
                autoload
                name="template"
                value={actualVersion.template}
                onChange={this.handleTemplateSelect}
                loadOptions={this.getTemplateOptions}
                labelKey="name"
                valueKey="id"
              />
              <FormError field="actualVersion.templateId" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment" className="col-sm-2 control-label">Comment</label>
            <div className="col-sm-6">
              <textarea
                name="comment"
                className="form-control"
                placeholder="Document comment"
                value={actualVersion.comment}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="labels" className="col-sm-2 control-label">Labels</label>
            <div className="col-sm-6">
              <Select
                multi
                autoload
                name="labels"
                value={actualVersion.labels}
                onChange={this.handleLabelsSelect}
                loadOptions={this.getLabelOptions}
                labelKey="name"
                valueKey="id"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="owner" className="col-sm-2 control-label">Owner</label>
            <div className="col-sm-6">
              <Select
                name="owner"
                value={profile}
                disabled
                labelKey="fullName"
                valueKey="id"
                loadOptions={this.getEmptyOptions}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="file" className="col-sm-2 control-label">Files</label>
            <div className="col-sm-6">
              <FileUpload multiple onSuccess={this.handleFileUpload} />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => pick(state, ['document', 'templates', 'labels', 'profile']);

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
