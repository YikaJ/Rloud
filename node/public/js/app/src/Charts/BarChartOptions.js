/**
 * Created by YikaJ on 15/12/9.
 */
'use strict';

let _ = require('lodash');
require('echarts/chart/line');

var dataCount = 15;

module.exports = {
  title: {text: '温度实时监控'},
  tooltip: {show: true},
  legend: {data: ['温度']},
  xAxis: [{
    type: 'category',
    data: _.range(0, dataCount, 0).map(()=>"")
  }],
  yAxis: [{type: 'value'}],
  series: [{
    name: '温度监控',
    type: 'line',
    data: _.range(0, dataCount, 0)
  }]
};