import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { If, Then } from 'qc-react-conditionals/lib';

import axios from 'Services/request';
import { API } from 'Config';

@autobind
export default class FileUpload extends Component {
  static defaultProps = {
    multiple: false,
    onSuccess: () => {},
    onFailure: () => {}
  };

  static propTypes = {
    multiple: PropTypes.bool,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
  };

  state = {
    files: []
  };

  axiosConfig = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };

  handleFileUpload({ target: { files } }) {
    this.setState({ files: [...files] });
    const mapped = [...files].map(file => {
      const fd = new FormData();
      fd.append('file', file);
      return axios.post(API.files, fd, this.axiosConfig);
    });
    Promise.all(mapped).then(res => {
      this.props.onSuccess(res.map(({ data }) => data.id));
    }).catch(e => {
      this.props.onFailure(e);
    });
  }

  render() {
    const { files } = this.state;
    const { multiple } = this.props;
    return (
      <div>
        <span className="btn btn-success fileinput-button">
          <i className="glyphicon glyphicon-plus" />
          <span>Add files...</span>
          <input
            multiple={multiple}
            type="file"
            name="files[]"
            onChange={this.handleFileUpload}
          />
        </span>
        <If is={files.length}>
          <Then>
            {
              files.map((file, index) => <span key={index}>&nbsp;{file.name}</span>)
            }
          </Then>
        </If>
      </div>
    );
  }
}
