/**
 * Created by YikaJ on 15/12/8.
 */
'use strict';
let React = require('react');
let ReactDOM = require('react-dom');

// echarts
let ec = require('echarts');
//let theme = require('echarts/theme/mint');
let options = require('./BarChartOptions');

let BarChart = React.createClass({

  componentDidMount(){
    // echarts的配置

    this.barChart = ec.init(this.refs.barChart);
    this.barChart.setOption(options)
  },

  componentWillUpdate(nextProps){
    let data = nextProps.data;

    if(Array.isArray(data)){
      data.forEach(this.addData);
    }else{
      this.addData(data);
    }
  },

  addData(data){
    let date = new Date();
    if(this.props.deviceId == data.deviceId){
      this.barChart.addData(
        0,
        data.value,
        false,
        false,
        `${date.getMinutes()}: ${date.getSeconds()}`
      )
    }
  },

  render(){
    return (
      <div className="charts">
        <div ref="barChart" id="barChart" style={{height: '400px'}}></div>
      </div>
    )
  }
});

module.exports = BarChart;