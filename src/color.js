const colorMap = {
  "BrightBlue": "\x1b[1;34m",
  "BrightMagenta": "\x1b[1;35m",
  "BrightRed": "\x1b[1;31m",
  "BrightGreen": "\x1b[1;32m",
  "BrightYellow": "\x1b[1;33m",
  "BrightCyan": "\x1b[1;36m",
  "BrightWhite": "\x1b[1;37m"
}

let colors = (function(){
  let results = []
  Object.keys(colorMap).forEach((key) => {
    results.push(colorMap[key])
  })
  return results
})()

function pickRandomColor(){
  let index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

module.exports = {
  colorLog: function(...args){ // 使用 ES6 rest参数 将参数类数组对象 变为真正数组， 或者使用Array.prototype.slice.call(arguments)
    let color = pickRandomColor()
    console.log(color, ...args)  //展运算符则可以看作是rest参数的逆运算
  }
}
