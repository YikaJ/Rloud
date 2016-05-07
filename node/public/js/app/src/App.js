/**
 * Created by YikaJ on 15/11/24.
 */
'use strict';
let reqwest = require('reqwest');
let React = require('react');
let LeftMenu = require('./leftMenu/LeftMenu');
let RightContent = require('./RightContent/RightContent');
require('./app.scss');

let App = React.createClass({

  getInitialState(){
    return {
      user: {}
    }
  },

  componentDidMount(){
    this.getUser();
  },

  render(){
    return (
      <div id="app" className="clearfix">
        <LeftMenu/>
        <RightContent user={this.state.user}/>
      </div>
    )
  },

  getUser(){
      reqwest({url: "/api/user"})
        .then((response)=>{
          let user = response.data.user;
          response.code && this.setState({user});
        })
        .catch((err)=>{
          console.log(err);
        });
  }
});

module.exports = App;