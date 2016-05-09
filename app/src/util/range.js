/**
 * Created by YikaJ on 16/5/8.
 */

export default function range(start, end, step = 1) {
  if(!end) {
    end = start
    start = 0
  }

  let arr = []

  for(let i = start; i < end; i += step) {
    arr.push(i)
  }

  return arr
}