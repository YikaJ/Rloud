/**
 * Created by YikaJ on 16/5/13.
 */
import range from './range'

const colors = ["#c70019", "#65d775", "#d356de", "#8e9aad", "#1605ba", "#494d59", "#d75064", "#e4a867", "#9e009a", "#a941f7", "#8868a7", "#de10d6", "#46fe84", "#13ba0b", "#d3ca37", "#1b4ff", "#3b2824", "#13ac32", "#6c8b99"]

export function randomColor(index) {
  if(index || index === 0) {
    return colors[index]
  } else {
    return generateColor()
  }
}

function generateColor() {
  return '#' + (Math.round(16777215 * Math.random())).toString(16)
}
