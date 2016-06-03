/**
 * Created by YikaJ on 16/5/31.
 */

// 根据 sessionId 更新 session
module.exports = function reloadSession(sessionID, session) {
  return new Promise((resolve, reject)=>{
    sessionStore.set(sessionID, session, (err, session) => {
      if(err) {
        return reject(err)
      }

      resolve(session)
    })
  })
}