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
    await DeviceModel.findOneAndUpdate(deviceId, {$set: deviceData})

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

    // Todo:将五次循环减到一次,从后到前
    const {todayAverage,_7Average,_14Average,_30Average} = getAverage(device)

    res.json({
      ret: 0,
      data: {todayAverage, _7Average, _14Average, _30Average}
    })
  } catch (err) {
    console.error(err)
    return res.json({ret: -1, msg: err.message})
  }
})

function getAverage(device) {
  const today = moment().startOf('day')
  const _30day = moment().startOf('day').subtract(30, 'days')
  let todayResult = _.range(24).map(i => [])
  let prevResult = _.range(30).map(i => [])

  const {data, chartOption: {dataItemList}} = device
  let i = data.length - 1

  // 数据入组
  while(i) {
    if(i === 0) break;
    const currentData = data[i]
    let dataTime = moment(currentData._time)

    if(dataTime.isBefore(_30day)) break;
    if(dataTime.isAfter(today)) {
      todayResult[dataTime.hour()].push(currentData)
    }else {
      dataTime = dataTime.startOf('day')
      const diffDay = today.diff(dataTime, 'days')
      prevResult[diffDay].push(currentData)
    }
    i--
  }

  //数据求均值
  let todayAverage = [], _30Average = []
  dataItemList.forEach(({name})=>{
    todayAverage = todayResult.map((hourDataArr, index)=>{
      let result =  hourDataArr.reduce((obj) => {
        return Object.assign({}, obj, {
          [name]: Math.round(_.mean(hourDataArr.map(data => data[name])))
        })
      }, todayAverage[index] || {})
      result.xAxisName = `${index < 10 ? '0' + index : index}: 00`
      return result
    })

    _30Average = prevResult.map((dayDataArr, index) => {
      let result = dayDataArr.reduce((obj) => {
        return Object.assign({}, obj, {
          [key]: Math.round(_.mean(dayDataArr.map(data => data[key])))
        })
      }, _30Average[index] || {})
      result.xAxisName = moment().subtract(index, 'days').format('M.D')
      return result
    })
  })

  _30Average.reverse()

  return {
    todayAverage,
    _7Average: _30Average.slice(-7),
    _14Average: _30Average.slice(-14),
    _30Average
  }
}

module.exports = router