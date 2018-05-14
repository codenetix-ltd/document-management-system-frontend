import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { $substituteDocument } from 'Store/actions';

@autobind
export class MassArchiveModal extends Component {
  static defaultProps = {
    substituteDocument: null
  };

  static propTypes = {
    substituteDocument: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    documents: PropTypes.any.isRequired
  };

  onChange(value) {
    this.props.dispatch($substituteDocument(value));
  }

  render() {
    const { documents: { list }, substituteDocument } = this.props;
    const options = list.map(({ actualVersion }) => actualVersion);
    return (
      <div>
        <p>Do you really want to archive selected documents?</p>
        <hr />
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-md-4 control-label">New actual document</label>
            <div className="col-md-8">
              <Select
                options={options}
                labelKey="name"
                valueKey="id"
                value={substituteDocument}
                onChange={this.onChange}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ documents, substituteDocument }) => ({ documents, substituteDocument });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MassArchiveModal);
