import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import pick from 'lodash/pick';

import { $substituteDocument } from 'Store/actions';

@autobind
export class ArchiveModalContent extends Component {
  static defaultProps = {
    substituteDocument: null
  };

  static propTypes = {
    substituteDocument: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    documents: PropTypes.any.isRequired,
    selectedDocuments: PropTypes.array.isRequired
  };

  onChange(value) {
    this.props.dispatch($substituteDocument(value));
  }

  render() {
    const {
      documents: { list },
      substituteDocument,
      selectedDocuments
    } = this.props;
    const options = list.map(({ actualVersion }) => actualVersion);
    const titlePart = selectedDocuments.length > 1 ? 'selected documents' : 'the document';
    return (
      <div>
        <p>{`Do you really want to archive ${titlePart}?`}</p>
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

const mapStateToProps = (state) => pick(state, ['documents', 'substituteDocument', 'selectedDocuments']);

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveModalContent);
