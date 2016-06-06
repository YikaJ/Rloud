/**
 * Created by YikaJ on 16/5/31.
 */
var reloadSession = require('../myUtil/reloadSession');
var UserModel = require('../models/UserModel');
var DeviceModel = require('../models/DeviceModel');
const _ = require('lodash');
const { BIND_DEVICE, CHART_DATA } = require('./deviceEvent').eventName
var sendEmail = require('../myUtil/sendEmail');
var moment = require('moment');

module.exports = async function chartDataCallback(jsonData, sessionInfo, socket) {
  const { userId, data, deviceId } = jsonData
  const session = await reloadSession(sessionInfo)
  const device = await DeviceModel.findOne({_id: deviceId})

  if(!device) return

  if(userId === session.user._id) {
    checkDataRight(jsonData, device, socket, session, sessionInfo)
    sendDataToClient(jsonData, device, socket)
  }
}

// 检测数据是否异常
async function checkDataRight({data, deviceId}, device, socket, session, {sessionStore, sessionID}) {
  try {
    let errors = [], errorData = {}
    const {dataItemList} = device.chartOption
    for(let i = 0, len = dataItemList.length; i < len; i++) {
      const {min, max, name} = dataItemList[i]
      if(min !== '' && data[name] < min) {
        errors.push(`${name}的数据小于限定最小值,${name}数据异常,${data[name]}`)
        errorData = {
          _time: data._time,
          time: moment(data._time).format('YYYY/MM/DD HH:mm:ss'),
          name,
          data: data[name]
        }
        await DeviceModel.findOneAndUpdate(
          {_id: deviceId}, {
            $push: {errorData}
          })
      }
      if(max !== '' && data[name] > max) {
        errors.push(`${name}的数据大于限定最大值,${name}数据异常,${data[name]}`)
        errorData = {
          _time: data._time,
          time: moment(data._time).format('YYYY/MM/DD HH:mm:ss'),
          name,
          data: data[name]
        }
        await DeviceModel.findOneAndUpdate({_id: deviceId}, {$push: {errorData}})
      }
    }
    // 若数据有异常:向客户端发通知;将异常数据存入数据库;发邮件异常通知
    if(errors.length) {
      await DeviceModel.findOneAndUpdate({_id: deviceId}, {$push: {data}})
      session = await reloadSession({sessionStore, sessionID})
      // 五分钟内的异常报警只触发一次
      if((Date.now() - (session.errorDataTime || 0)) > 5 * 60 * 1000) {
        await sessionStore.set(sessionID,
          Object.assign({}, session, {errorDataTime: Date.now()})
        )

        console.warn('监控警报:数据异常', errors.join(','))
        socket.emit('data_warning', {
          ret: 0,
          data: {
            device,
            errorData,
            msg: errors.join('\n')
          }
        })

        sendEmail(errors, session.user.email)
      }
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
      data.xAxisName = moment(data._time).format('HH:mm:ss')
      socket.emit(CHART_DATA, {ret: 0, data:{data, deviceId} })
    } catch (err) {
      return console.error('chartData.js Error: ', err)
    }
}
