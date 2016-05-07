/**
 * Created by YikaJ on 15/11/24.
 */
'use strict';

let React = require('react');

let LeftMenu = React.createClass({
  render(){
    return (
      <div className="leftMenu pull-left">
        <div className="left_header">
          Rloud 云平台
        </div>
        <ul className="menu">
          <li>
            <i className="mdi-hardware-desktop-windows"></i>
            <span>我的设备</span>
          </li>
          <li>
            <i className="mdi-action-query-builder"></i>
            <span>历史数据</span>
          </li>
          <li>
            <i className="mdi-action-trending-up"></i>
            <span>趋势图</span>
          </li>
          <li>
            <i className="mdi-content-add"></i>
            <span>新增设备</span>
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = LeftMenu;