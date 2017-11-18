const colors = require('./color')
const readline = require('readline')
const http = require('http')

const API_KEY = '2085209a687d417791d2d0d650480136'

//定义返回数据标识码
const RESPONSE_TYPE = {
  TEXT: 100000,
  LINK: 200000,
  NEWS: 302000,
  COOKBOOK: 308000
}

function initRobot(){
  let welcomeMsg = '请开始我们的尬聊'
  Array.prototype.forEach.call(welcomeMsg, (char) => {
    colors.colorLog('----------', char, '----------')
  })
  
  const rl = readline.createInterface({  //创建接口
    input: process.stdin,
    output: process.stdout
  })
  
  let username = ''  //userid
  rl.question('\n> 敢问阁下尊姓大名是：', (answer) => {
    username = answer
    colors.colorLog(`\n${answer}你好，在下已恭候多时\n`)
    chat()
  })
  
  function chat(){
    rl.question('> 请输入你的问题：', (query) => {
      if(!query){
        colors.colorLog('阁下请慢走，恕不远送')
        process.exit(0)
      }
  
      const options = {
        hostname: 'www.tuling123.com',
        path: '/openapi/api',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      const req = http.request(options, (res) => { //创建http请求
        let rawData = ''
        //监听data和end事件
        res.on('data', (chunk) => {
          rawData += chunk  //nodejs中接收响应数据是以数据流的方式，一波一波的发送，因此需要不断积累
        })
        res.on('end', () => {
          colors.colorLog(handleResponse(rawData)) 
          chat()
        })
      })
      
      req.write(JSON.stringify({ //写入请求主体
        key: API_KEY,
        info: query,
        userid: username
      }))
      req.end()
    })
  }
  
  function handleResponse(data){
    let res = JSON.parse(data)
    switch(res.code){
      case RESPONSE_TYPE.TEXT:
        return res.text
      case RESPONSE_TYPE.LINK:
        return `${res.text}: ${res.url}`
      case RESPONSE_TYPE.NEWS:
        let listNewsInfo = '';
        (res.list).forEach((item) => {
          listNewsInfo += `\n文章：${item.article}\n来源：${item.source}\n链接：${item.detailurl}`
        })
        return `${res.text}\n${listNewsInfo}`
      case RESPONSE_TYPE.COOKBOOK:
        let listCookInfo = '';
        (res.list || []).forEach((item) => {
          listCookInfo += `菜名：${item.name}\n食材：${item.info}\n链接：${item.detailurl}`
        })
        return `${res.text}\n${listCookInfo}`
      default:
        return res.text
    } 
  }
}

module.exports = initRobot





























// rl.setPrompt('Test> ');
// rl.prompt();

// rl.on('line', function(line) {
//     switch(line.trim()) {
//         case 'copy':
//             console.log("复制");
//             break;
//         case 'hello':
//             console.log('world!');
//             break;
//         case 'close':
//             rl.close();
//             break;
//         default:
//             console.log('没有找到命令！');
//             break;
//     }
//     rl.prompt();
// });

// rl.on('close', function() {
//     console.log('bye bye!');
//     process.exit(0);
// });