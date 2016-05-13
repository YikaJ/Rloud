/**
 * Created by YikaJ on 16/5/10.
 * 用于过滤有用的数据源
 */
var deviceServerConfig = require('../config').deviceServer;
module.exports = function filter(jsonData) {
  const { type, secret } = jsonData
  if(type && secret && secret === deviceServerConfig.secret) {
    return jsonData
  }

  return false
}