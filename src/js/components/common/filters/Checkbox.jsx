import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Checkbox from 'Components/common/dataControls/DataCheckbox';

@autobind
export default class CheckboxFilter extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  onControlToggle() {
    const { onChange, filterType } = this.props;
    const nextValue = !this.state.checked;
    this.setState({ checked: nextValue });
    onChange(filterType, nextValue);
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <span className="input-group-addon">{this.props.label}:</span>
        <span className="input-group-addon">
          <Checkbox
            onChange={this.onControlToggle}
            checked={this.state.checked}
          />
        </span>
      </div>
    );
  }
}
