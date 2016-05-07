/**
 * Created by YikaJ on 15/11/24.
 */
'use strict';

let React = require('react');

// 数据流
let io = require('socket.io');
let socket = io.connect("http://localhost:3333");

// Component
let BarChart = require('../Charts/BarChart');

let RightContent = React.createClass({

  getInitialState(){
    return {
      data: {}
    }
  },

  componentDidMount(){
    socket.on("data", (data)=>{
      this.setState({data});
    });

    /**
     * 对错误的控制与处理
     * 2: 未登陆
     *
     */
    socket.on("err", (data)=>{
      // 数据与实现分离
      let errHandle = {
        2: ()=> location.href = "/login"
      };
      let defaultDef = ()=> location.href = "/";


      (errHandle[data.code] || defaultDef)()
    });
  },

  render(){
    return (
      <div className="rightContent pull-right">
        <div className="right_header clearfix">
          <div className="pull-right">
            <a href="javascript:" className="btn btn-reg">{this.props.user.username || 'Rloud'}</a>
            <a href="/logout" className="btn">登出</a>
          </div>
        </div>
        <div className="content">
          <BarChart deviceId="1" data={this.state.data} />
        </div>
      </div>
    )
  }
});

module.exports = RightContent;