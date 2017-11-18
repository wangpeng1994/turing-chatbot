const colors = require('./color')
const readline = require('readline')
const http = require('http')

const API_KEY = '2085209a687d417791d2d0d650480136'

function welcome(){
  let welcomeMsg = '请开始你的尬聊'
  Array.prototype.forEach.call(welcomeMsg, (char) => {
    colors.colorLog('----------', char, '----------')
  })
}
welcome()

const rl = readline.createInterface({
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
    const options = {
      hostname: 'www.tuling123.com',
      path: '/openapi/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const req = http.request(options, (res) => {
      let rawData = ''
      res.on('data', (chunk) => {
        console.log(chunk)
        rawData += chunk  //nodejs中接收响应数据是以数据流的方式，一波一波的发送，因此需要不断积累
      })
      res.on('end', () => {
        console.log(rawData)
      })
    })

    req.write(JSON.stringify({
      key: API_KEY,
      info: query,
      userid: username
    }))

    req.end()
  })
}








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