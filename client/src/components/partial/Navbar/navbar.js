import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drop from "../dropdown";
import SettingMenu from "../settings-menu";

import "./navbar.css";

class Navbar extends Component {
  state = {
    searchVisible: false,
    searchQuery: "",
    settingLink: true
  };

  isMobile = () => {
    const width = window.innerWidth;
    return width < 992;
  };

  handleResize = () => {
    let searchVisible, settingLink;
    const isMobile = this.isMobile();
    if (isMobile) {
      if (this.state.searchQuery) {
        searchVisible = true;
      }
      settingLink = true;
    } else {
      searchVisible = true;
      settingLink = false;
    }
    this.setState({ searchVisible, settingLink }, () => {
      if(!isMobile && this.props.pathname === '/settings') {
        this.props.history.push('/');
        setTimeout(() => {
          document.querySelector('.drop-triger').click();
        }, 600);
      }
    });
  };

  onSearchButtonClick = event => {
    if (this.isMobile()) {
      if (this.state.searchVisible) {
        this.setState({ searchVisible: false });
      } else {
        this.setState({ searchVisible: true });
      }
    } else {
      event.preventDefault();
    }
  };

  onSearchClear = () => {
    this.setState({ searchQuery: "" });
    this.refs.searchField.focus();
  };

  onChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <nav id="navContainer">
        <div id="brand">
          <a href="/">
            <span>Just Notes</span>
          </a>
        </div>
        <div id="searchbar">
          <div id="searchForm">
            <div
              id="searchIcon"
              onClick={this.onSearchButtonClick}
              className={this.state.searchVisible ? "activeBtn" : null}
            >
              <i className="fas fa-search fa-lg" />
            </div>
            {this.state.searchVisible ? (
              <div id="searchField" className="underline">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={this.onChange.bind(this)}
                  value={this.state.searchQuery}
                  autoFocus={!!this.isMobile()}
                  ref="searchField"
                />
                {this.state.searchQuery ? (
                  <div id="closeBtn" onClick={this.onSearchClear}>
                    <i className="fas fa-times fa-lg" />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <button id="addNoteBtn" type="button">
            <i className="fas fa-plus fa-lg" />
          </button>
          <div id="settings">
            {this.isMobile() ? (
              <Link
                className={this.props.pathname === '/settings' ? "activeBtn" : null}
                to={this.props.pathname === "/settings" ? "/" : "/settings"}
              >
                <i className="fas fa-cog fa-lg" />
              </Link>
            ) : (
              <Drop icon="fas fa-cog fa-lg" right>
                <SettingMenu option="drop-item" />
              </Drop>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
