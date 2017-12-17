const fs = require('fs')

// fs.readFile('./color.js', 'utf-8', (err, data) => {
//   console.log(data)
// })

//callback 改造成 promise
function promisify(fn, ctx){  //
  return function(...args){
    return new Promise((resolve, reject) => {
      let allArgs = args.concat((err, data) => {  //fn读取到了，会调用第三个cb函数，而第三个cb函数是对 resolve的响应
        if(err){                                  //解决存储data之后，就可以继续调用then来进一步处理data
          reject(err)
        }
        resolve(data)
      })
      //之后fn调用时，如果数据读取到了，就会调用第三个cb参数，调用cb时，发现了resolve(data)的要求，于是存储data
      fn.apply(ctx || this, allArgs)
    })
  }
}

let readFilePromise = promisify(fs.readFile, fs) //传入函数后，函数会丢失 fs 的引用

readFilePromise('./color.js', 'utf-8').then((data) => {
  console.log(data)
})
















