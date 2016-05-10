/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let events = require('events');

/**
 * 设备数据来源模型
 * @api
 * read userId, callback
 * 读取到数据后处理
 *
 * write data
 * 将设备的数据写入模型
 *
 * clean
 * 清空监听器,手动处理GC
 */
class IOEvent {
  constructor() {
    this.event = new events.EventEmitter();

    // 定义设备传输的事件名,包括数据和绑定设备
    this.eventName = {
      CHART_DATA: 'cden',
      BIND_DEVICE: 'bden',
      SEND_TO_DEVICE: 'stden'
    }
  }

  // 应用服务器监听事件
  listenEvent(callback) {
    Object.keys(this.eventName).forEach((eventName) => {
      this.ev.on(eventName, jsonData => callback(jsonData))
    })
  }

  // 从设备服务器处触发事件
  emitEvent(jsonData) {
    this.ev.emit(jsonData.type, jsonData)
  }

  clean(eventName) {
    this.ev.removeListener(eventName)
  }
}
module.exports = new IOEvent();
