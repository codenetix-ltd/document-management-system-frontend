import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import cln from 'classnames';

import { DataLink } from 'Components/common/dataControls';

@autobind
export default class Tabs extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { list: newList } = nextProps;
    const { list: oldList } = this.props;
    if (JSON.stringify(newList) !== JSON.stringify(oldList)) {
      this.setState({ list: newList });
    }
  }

  onTabClick(index) {
    const list = this.state.list.map((item, idx) => {
      const tab = { ...item };
      if (index === idx) {
        tab.active = true;
        return tab;
      }
      tab.active = false;
      return tab;
    });
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    const tabNavs = list.map(({ title, active }, index) => (
      <li key={index} className={cln({ active })}>
        <DataLink data={index} onClick={this.onTabClick}>{title}</DataLink>
      </li>
    ));

    const tabContent = list.map(({ active, content }, index) => (
      <div key={index} className={cln({ 'tab-pane': true, active })}>{content}</div>
    ));

    return (
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">{tabNavs}</ul>
        <div className="pull-right" style={{ marginRight: '20px', marginTop: '10px' }}>
          <button className="btn btn-success btn-sm">
            <i className="fa fa-upload" /><span style={{ marginLeft: '5px' }}>Export</span>
          </button>
        </div>
        <div className="tab-content">{tabContent}</div>
      </div>
    );
  }
}
