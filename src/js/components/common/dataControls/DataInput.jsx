import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { DebounceInput } from 'react-debounce-input';
import { If, Then, Else } from 'qc-react-conditionals/lib';

@autobind
export default class DataInput extends Component {
  static defaultProps = {
    cls: '',
    name: '',
    data: null,
    type: 'text',
    value: '',
    placeholder: '',
    debounce: false,
    debounceTimeout: 300,
    onChange: () => {}
  };

  static propTypes = {
    cls: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    debounce: PropTypes.bool,
    debounceTimeout: PropTypes.number,
    onChange: PropTypes.func
  };

  handleChange(event) {
    this.props.onChange(event, this.props.data);
  }

  render() {
    const {
      cls,
      type,
      name,
      value,
      placeholder,
      debounce,
      debounceTimeout
    } = this.props;
    return (
      <If is={debounce}>
        <Then>
          <DebounceInput
            type={type}
            value={value}
            onChange={this.handleChange}
            className={cls}
            name={name}
            placeholder={placeholder}
            debounceTimeout={debounceTimeout}
          />
        </Then>
        <Else>
          <input
            type={type}
            value={value}
            onChange={this.handleChange}
            className={cls}
            name={name}
            placeholder={placeholder}
          />
        </Else>
      </If>
    );
  }
}
