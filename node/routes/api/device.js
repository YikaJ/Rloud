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

router.post("/editDevice", async function(req, res, next) {
  const deviceData = req.body
  const deviceId = deviceData.deviceId

  try {
    await DeviceModel.findByIdAndUpdate(deviceId, {$set: deviceData})

    res.json({
      ret: 0,
      msg: '设备信息修改成功'
    })
  } catch (err) {
    console.error('错误,无法生成设备数据:', err.message)
    res.json({
      ret: 2,
      msg: err.message
    })
  }

});

router.post("/delDevice", async function(req, res) {
  const deviceId = req.body['deviceId']
  try{
    await DeviceModel.findOneAndRemove(deviceId)
    return res.json({
      ret: 0,
      msg: '删除设备成功'
    })
  } catch(err) {
    console.error(err)
    return res.json({ret: -1, msg: err.message})
  }
})

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
    const filterData = device.data

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
  const today = moment().startOf('day')
  return function(device, data) {
    let resultArr = []

    // 如果没有传 day 参数,则认为是取当天数据
    if(!day) {
      const todayData = data.filter(({_time}) => moment(_time).isAfter(today))
      resultArr = _.range(24).map(()=>[])
      todayData.forEach((data)=>{
        const hour = moment(data._time).hour()
        resultArr[hour].push(data)
      })
    } else {
      resultArr = _.range(day).map(()=>[])
      const dayData = data === 30 ? data : data.filter(({_time}) => moment(_time).isAfter(moment().startOf('day').subtract(day, 'days')))
      dayData.forEach((data)=>{
        const diffDay = today.diff(moment(data._time).startOf('day'), 'days')
        resultArr[day - diffDay] && resultArr[day - diffDay].push(data)
      })
    }

    return resultArr.map((dataArr, i) => {
      // 今天某个时间点没数据,就只显示轴
      if(!day && dataArr.length <= 0) return {xAxisName: `${i}:00`}

      // 根据数据选项求平均值
      const {dataItemList} = device.chartOption
      const averageData = dataItemList.reduce((obj, {name}) => {
        return Object.assign({}, obj, {
          [name]: Math.round(_.mean(dataArr.map(data => data[name])))
        })
      }, {})

      if(!day) {
        averageData.xAxisName = `${i}:00`
      } else {
        averageData.xAxisName = moment().subtract(day - i, 'days').format("M.D")
      }

      return averageData
    })
  }
}

module.exports = router