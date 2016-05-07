/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules';
import styles from './Header.scss'

@CSSModules(styles)
class Header extends Component {
  render() {
    return (
      <header className="clearfix" styleName="app-header-wrapper">
        <div styleName="app-header">
          <div className="pull-left">
            <a href="/" styleName="logo">Rloud</a>
          </div>
          <div className="pull-right">
            <a href="/" styleName="username">Yika</a>
            <a href="/logout" styleName="logout-btn">登出</a>
          </div>
        </div>
      </header>
    )

  }
}

export default Header