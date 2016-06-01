/**
 * Created by YikaJ on 16/5/31.
 */
var reloadSession = require('../myUtil/reloadSession');
var UserModel = require('../models/UserModel');
var DeviceModel = require('../models/DeviceModel');
const _ = require('lodash');
const { BIND_DEVICE, CHART_DATA } = require('./deviceEvent').eventName
var sendEmail = require('../myUtil/sendEmail');

module.exports = async function chartDataCallback(jsonData, sessionInfo, socket) {
  const { userId, data, deviceId } = jsonData
  const session = await reloadSession(sessionInfo)
  const device = await DeviceModel.findOne({_id: deviceId})

  checkDataRight(jsonData, device, socket)

  if(userId === session.user._id) {
    sendDataToClient(jsonData, device, socket)
  }
}

// 检测数据是否异常
async function checkDataRight({data, deviceId}, device, socket) {
  try {
    let errors = []
    const {dataItemList} = device.chartOption
    for(let i = 0, len = dataItemList.length; i < len; i++) {
      const {min, max, name} = dataItemList[i]
      if(min !== void 0 && data[name] < min) {
        errors.push(`${name}的数据小于限定最小值,${name}数据异常,${data[name]}`)
      }
      if(max !== void 0 && data[name] > max) {
        errors.push(`${name}的数据大于限定最大值,${name}数据异常,${data[name]}`)
      }
    }
    // 若数据有异常:向客户端发通知;将异常数据存入数据库;发邮件异常通知
    if(errors.length) {
      console.warn('监控警报:数据异常', errors.join(','))
      socket.emit(CHART_DATA, {
        ret: 4,
        msg: errors.join('\n')
      })

      await DeviceModel.findOneAndUpdate({_id: deviceId}, {$push: {data}})

      sendEmail(errors)
    }
  }catch(error) {
    console.error(error)
  }

}

// 发送到相应的客户端
async function sendDataToClient({ data, deviceId }, device, socket) {
    try {
      const deviceData = device.data
      // 一分钟才记录一个数据
      if(deviceData.length === 0 || data._time - (_.last(deviceData)._time) > (1000 * 60)) {
        await DeviceModel.findOneAndUpdate({_id: deviceId}, {$push: {data}})
      }
      socket.emit(CHART_DATA, {ret: 0, data:{data, deviceId} })
    } catch (err) {
      return console.error('io.js Error: ', err)
    }
}
