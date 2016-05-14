/**
 * Created by YikaJ on 16/5/13.
 */
import range from './range'

const colors = ["#0c9", "#03f", "#c00", "#960", "#0ff", "#c09", "#cf0", "#f6f", "#c3f", "#9ff", "#990", "#666"]

export function randomColor(index) {
  if(index || index === 0) {
    index = index % colors.length
    return colors[index]
  } else {
    return generateColor()
  }
}

function generateColor() {
  return '#' + (Math.round(16777215 * Math.random())).toString(16)
}
