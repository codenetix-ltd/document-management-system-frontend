import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import cln from 'classnames';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { If, Then } from 'qc-react-conditionals/lib';

import { DataLink } from 'Components/common/dataControls';

@autobind
export class Sidebar extends Component {
  static defaultProps = {
    menuData: []
  };

  static propTypes = {
    menuData: PropTypes.array,
    types: PropTypes.any.isRequired,
    profile: PropTypes.any.isRequired,
    location: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { activeName: null };
  }

  // prefetch types for later usage
  componentDidMount() {
    const { types, dispatch } = this.props;
    if (!types.length) {
      import('Store/thunks/types').then(({ $$typesFetch }) => {
        $$typesFetch(dispatch);
      });
    }
  }

  onNameClick(name) {
    this.setState({ activeName: name });
  }

  onLinkClick() {
    this.setState({ activeName: null });
  }

  render() {
    const { activeName } = this.state;
    const { profile, menuData, location: { pathname } } = this.props;
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src={require('Images/user-default.jpeg')}
                className="img-circle"
                alt="User image"
              />
            </div>
            <div className="pull-left info">
              <p>{profile.fullName}</p>
              <DataLink><i className="fa fa-circle text-success" /> Online</DataLink>
            </div>
          </div>
          <ul className="sidebar-menu">
            {
              menuData.map(({ icon, name }, index) => {
                const addLink = `/${name.toLowerCase()}`;
                const listLink = `/${name.toLowerCase()}/list`;
                const addLinkActive = pathname === addLink;
                const listLinkActive = pathname === listLink;
                let isActive = pathname.includes(listLink) || pathname.includes(addLink);
                if (activeName) isActive = name === activeName;
                const itemCls = cln('treeview', { active: isActive });
                const iconCls = cln('fa', { [icon]: icon });
                return (
                  <li key={index} className={itemCls}>
                    <DataLink data={name} onClick={this.onNameClick}>
                      <i className={iconCls} /> <span>{name}</span>
                    </DataLink>
                    <ul className="treeview-menu">
                      <li className={cln({ active: listLinkActive })}>
                        <Link to={listLink} onClick={this.onLinkClick}>
                          <i className="fa fa-list" /> <span>List all</span>
                        </Link>
                      </li>
                      <If is={name !== 'Logs'}>
                        <Then>
                          <li className={cln({ active: addLinkActive })}>
                            <Link to={addLink} onClick={this.onLinkClick}>
                              <i className="fa fa-plus" /> <span>Add new</span>
                            </Link>
                          </li>
                        </Then>
                      </If>
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </aside>
    );
  }
}

const mapStateToProps = ({ profile, types }) => ({ profile, types });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
