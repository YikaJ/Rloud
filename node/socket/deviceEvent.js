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

  // 应用服务器监听事件,包括图表需要的数据和绑定设备时需要输入BIND CODE
  listenEvent(callback) {
    const {CHART_DATA, BIND_DEVICE} = this.eventName
    const events = [CHART_DATA, BIND_DEVICE]

    events.forEach((eventName) => {
      this.event.on(eventName, jsonData => callback(jsonData))
    })
  }

  // 从设备服务器取到jsonData后触发事件
  emitEvent(jsonData) {
    this.event.emit(jsonData.type, jsonData)
  }

  clean(fn) {
    const {CHART_DATA, BIND_DEVICE} = this.eventName
    const events = [CHART_DATA, BIND_DEVICE]
    events.forEach((eventName) => {
      this.event.removeListener(eventName, fn)
    })
  }
}

const event = new IOEvent()
module.exports = event;
