import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cln from 'classnames';
import autobind from 'autobind-decorator';
import onClickOutside from 'react-onclickoutside';

import { DataCheckbox } from 'Components/common/dataControls';

@autobind
export class CheckboxSelect extends Component {
  static defaultProps = {
    onChange: () => {}
  };

  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      list: []
    };
  }

  /**
   * receives new options and if they are the same does nothing
   * but if they differ updates state adding checked field to every item
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { options: newOptions } = nextProps;
    const { options: oldOptions } = this.props;
    const newOpts = JSON.stringify(newOptions);
    const oldOpts = JSON.stringify(oldOptions.map(({ value, label }) => ({ value, label })));
    if (newOpts !== oldOpts) {
      const list = newOptions.map(({ value, label }) => ({ value, label, checked: false }));
      this.setState({ list });
    }
  }

  onOptionSelect(e, { index, item }) {
    const newList = [...this.state.list];
    newList[index].checked = !item.checked;
    this.setState({
      list: newList
    });
    const selected = newList.filter(({ checked }) => checked).map(({ value, label }) => ({
      value, label
    }));
    this.props.onChange(selected);
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }

  toggleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let text = 'None selected';
    const { isOpen, list } = this.state;
    const cls = cln({ isOpen });
    const selected = list.filter(({ checked }) => checked);
    const options = list.map((item, index) => {
      const { value, label, checked } = item;
      return (
        <li key={index}>
          <label title={label}>
            <DataCheckbox
              value={value}
              data={{ index, item }}
              checked={checked}
              onChange={this.onOptionSelect}
            />
            {label}
          </label>
        </li>
      );
    });
    if (selected.length > 0 && selected.length <= 3) {
      text = selected.map(({ label }) => label).join(', ');
    }
    if (selected.length > 3) {
      text = `${selected.length} selected`;
    }
    return (
      <div className="checkboxSelect">
        <button type="button" className="btn btn-default" onClick={this.toggleDropdown}>
          <span>{text}</span>
        </button>
        <ul className={cls}>{options}</ul>
      </div>
    );
  }
}

export default onClickOutside(CheckboxSelect);
