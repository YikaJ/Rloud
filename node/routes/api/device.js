/**
 * Created by YikaJ on 16/5/7.
 */
const express = require('express');
const router = express.Router();
const DeviceModel = require('../../models/DeviceModel');
const UserModel = require('../../models/UserModel');
const datetime = require('../../myUtil/datetime');
const _ = require('lodash');
const moment = require('moment');

router.get('/getDevice', async function(req, res, next) {
  const userId = req.session.user._id
  const deviceQuery = await DeviceModel.find({userId})
  // 将数据转换成 KV 导出
  const device = deviceQuery.reduce((obj, item)=>{
    const newItem = Object.assign({}, item._doc)
    delete newItem.data // 移除数据

    return Object.assign({}, obj, {[item._id]: newItem})
  }, {})
  res.json({
    ret: 0,
    data: {device}
  })
})

router.post("/createDevice", async function(req, res, next) {
  const userId = req.session.user._id
  const deviceData = req.body
  deviceData.userId = userId
  deviceData.data = []

  // new Device
  const deviceEntity = new DeviceModel(deviceData)
  let device

  try {
    device = await deviceEntity.save()
  } catch (err) {
    console.error('错误,无法生成设备数据:', err.message)
    res.json({
      ret: 2,
      msg: err.message
    })
  }

  console.log("设备注册成功,等待绑定")

  res.json({
    ret: 0,
    data: {
      deviceId: device._id
    }
  })

});

router.post("/getBindCode", function(req, res, next) {
  const bindCode = (Date.now() + parseInt(1000 * Math.random())).toString(36)
  const deviceId = req.body['deviceId']

  // 将 bindCode 存储到 session 内,等待激活
  req.session.bindDevice = { bindCode, deviceId }

  res.json({
    ret: 0,
    data: {
      bindCode, deviceId
    }
  })
});

router.post("/getHistoryData", async function(req, res) {
  const deviceId = req.body['deviceId']
  let device
  try {
    device = await DeviceModel.findOne({_id: deviceId})
    const filterData = device.data.filter(({_time}) => _time >= moment().startOf('day').subtract(30, 'days'))

    const todayAverage = getAverage()(device, filterData)
    const _7Average = getAverage(7)(device, filterData)
    const _14Average = getAverage(14)(device, filterData)
    const _30Average = getAverage(30)(device, filterData)

    res.json({
      ret: 0,
      data: {todayAverage, _7Average, _14Average, _30Average}
    })
  } catch (err) {
    console.error(err)
    return res.json({ret: -1, msg: err.message})
  }
})

function getAverage(day) {
  return function(device, data) {
    const today = moment().startOf('day')
    let resultArr = []

    // 如果没有传 day 参数,则认为是取当天数据
    if(!day) {
      const todayData = data.filter(({_time}) => moment(_time).isAfter(today))
      for(let i = 0; i < 24; i++) {
        let aDate = moment().startOf('day').hours(i)
        let bDate = moment().startOf('day').hours(i + 1)

        const data = todayData.filter(({_time}) => moment(_time).isBetween(aDate, bDate))
        resultArr.push(data)
      }
    } else {
      const dayData = data === 30 ? data : data.filter(({_time}) => moment(_time).isAfter(today.subtract(day, 'days')))

      for(let i = 0; i < day; i++) {
        let aDate = moment().startOf('day').subtract(i + 1, 'days')
        let bDate = moment().startOf('day').subtract(i, 'days')

        const data = dayData.filter(({_time}) => moment(_time).isBetween(aDate, bDate))
        data.length > 0 && resultArr.push(data)
      }
    }

    return resultArr.map((dataArr, i) => {
      // 今天某个时间点没数据,就只显示轴
      if(!day && dataArr.length <= 0) return {xAxisName: `${i}:00`}

      // 根据数据选项求平均值
      const {dataItemList} = device.chartOption
      const averageData = dataItemList.reduce((obj, key) => {
        return Object.assign({}, obj, {
          [key]: Math.round(_.mean(dataArr.map(data => data[key])))
        })
      }, {})

      if(!day) {
        averageData.xAxisName = `${i}:00`
      } else {
        const day = moment(dataArr[0]._time)
        averageData.xAxisName = day.format("M.D")
      }

      return averageData
    })
  }
}

module.exports = router