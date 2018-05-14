import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { $newActualDocument } from 'Store/actions';

@autobind
export class MassArchiveModal extends Component {
  static defaultProps = {
    newActualDocument: null
  };

  static propTypes = {
    newActualDocument: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    documents: PropTypes.any.isRequired
  };

  onChange(value) {
    this.props.dispatch($newActualDocument(value));
  }

  render() {
    const { documents: { list }, newActualDocument } = this.props;
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
                value={newActualDocument}
                onChange={this.onChange}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ documents, newActualDocument }) => ({ documents, newActualDocument });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MassArchiveModal);
