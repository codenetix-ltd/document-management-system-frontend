import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import ContentHeader from 'Components/ContentHeader';
import ContentWrapper from 'Components/ContentWrapper';
import LabelForm from 'Routes/labels/partials/Form';

import axios from 'Services/request';
import { API } from 'Config';

import { $$labelFetch } from 'Store/thunks/labels';

@autobind
export class LabelEdit extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    label: PropTypes.any.isRequired
  };

  componentDidMount() {
    this.fetchLabel();
  }

  onFormSubmit(formData) {
    const { labelID } = this.props.match.params;
    axios.put(`${API.labels}/${labelID}`, formData).catch(err => {
      throw err;
    });
  }

  fetchLabel() {
    const { dispatch } = this.props;
    const { labelID } = this.props.match.params;
    $$labelFetch(dispatch, labelID);
  }

  breadcrumbs = [
    { pageName: 'Labels', pageLink: '/labels', iconCls: 'fa fa-tags' }
  ];

  render() {
    const { label } = this.props;
    return (
      <div>
        <ContentHeader title={`Edit ${label.name || ''}`} breadcrumbs={this.breadcrumbs} />
        <ContentWrapper boxClass="box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Label</h3>
          </div>
          <LabelForm
            label={label}
            onSubmit={this.onFormSubmit}
            submitButtonText="Update"
          />
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ label }) => ({ label });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LabelEdit);
