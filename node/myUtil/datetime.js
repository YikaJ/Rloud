/**
 * Created by YikaJ on 16/5/16.
 */

exports.getTime = function(datetime) {
  const Y = datetime.getFullYear()
  const M = datetime.getMonth() + 1
  const D = datetime.getDate()
  const h = datetime.getHours()
  const m = datetime.getMinutes()
  const s = datetime.getSeconds()
  
  return {Y,M,D,h,m,s,datetime}
}

