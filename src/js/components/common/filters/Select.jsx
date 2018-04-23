import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import CheckboxSelect from 'Components/common/CheckboxSelect';
import { If, Then } from 'qc-react-conditionals/lib';

@autobind
export default class SelectFilter extends Component {
  static defaultProps = {
    label: ''
  };

  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    filterType: PropTypes.string.isRequired
  };

  onValueChange(value) {
    const { onChange, filterType } = this.props;
    onChange(filterType, value);
  }

  render() {
    const { label, options } = this.props;
    return (
      <div className="input-group input-group-sm">
        <If is={label}>
          <Then>
            <span className="input-group-addon">{label}</span>
          </Then>
        </If>
        <CheckboxSelect options={options} onChange={this.onValueChange} />
      </div>
    );
  }
}
