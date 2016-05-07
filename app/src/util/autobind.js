/**
 * Created by YikaJ on 16/5/7.
 */
export default function autobind(target, key, descriptor) {
  const fn = descriptor.value

  if (typeof fn !== 'function') throw new Error(`@autobind decorator 只能用在 function 上而不是${typeof fn}`)

  return {
    configurable: true,
    get() {
      if (this === target.prototype || this.hasOwnProperty(key)) {
        return fn
      }

      const boundFn = fn.bind(this)
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      })

      return boundFn
    },

    set() {}
  }
}