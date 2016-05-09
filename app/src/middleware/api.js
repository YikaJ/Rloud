/**
 * Created by YikaJ on 16/5/8.
 */

export const CALL_API = 'CALL_API'

export default () => next => action => {
  const symbol = action[CALL_API]

  // 若匹配不到symbol，则当作正常action
  if (typeof symbol === 'undefined') return next(action)

  // 交给 api 中间件特殊处理
  const {
    types, request, payload = {},
    method = 'GET', success,
    error
    } = symbol

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    types.some(type => typeof type !== 'string')
  ) {
    throw new Error('types 必须是一个包含三个actionType字符串的数组 ')
  }

  if (typeof request !== 'string' && typeof request !== 'function') {
    throw new Error('request 必须是url字符串或者请求函数')
  }

  /**
   * 统一封装成 {type: String, payload: Object}
   */
  function actionWith(response) {
    const responsePayload = response.payload
    const type =  response.type
    if(type === successType) {
      // 成功取回数据后，清除无用的数据
      delete payload._c
      delete payload._a
    }

    return Object.assign({
      type,
      payload: {
        ...payload,
        ...responsePayload
      }
    })
  }

  // 下面是通用异步请求的封装
  const [requestType, successType, failureType] = types

  next(actionWith({type: requestType}))

  if (typeof request === 'string') {
    // 请求体
    const body = JSON.stringify({
      _: Date.now(),
      ...payload
    })

    let fetchPromise;

    // TODO 封装通用get请求
    if(method.toUpperCase() === 'GET') {
      fetchPromise = fetch(request, {
        credentials: 'same-origin'
      })
    }

    // 封装通用的 POST 请求
    if(method.toUpperCase() === 'POST') {
      fetchPromise = fetch(request, {
        method: 'POST',
        body,
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

    fetchPromise
      .then(res => res.json())
      .then(({data, ret, msg}) => {
        // 服务器返回错误
        if(ret !== 0) {
          throw new Error(msg)
        } else {
          // POST 成功
          next(actionWith({
            type: successType,
            payload: data
          }))

          success && success(next)
        }
      })
      .catch(e => {
        // 捕获错误
        next(actionWith({
          type: failureType,
          payload: {message: e.message}
        }))
        error && error(e.message)
      })
  }
}