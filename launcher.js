// const vconsole = require('fs').readFileSync("C:\\Program Files\\Tencent\\QQNT\\resources\\app\\app_launcher\\vconsole.min.js")
// const eruda = require('fs').readFileSync("C:\\Program Files\\Tencent\\QQNT\\resources\\app\\app_launcher\\eruda.min.js")
const img = require('fs').readFileSync("C:\\Program Files\\Tencent\\QQNT\\resources\\app\\app_launcher\\img.txt")
const themeColor = '#5776FF'
const bgColor = (val) => {
  return `background-color:${val} !important;`
}
const styleList = {
  // 选择字体的背景颜色
  ['::selection']: bgColor('#79C8E3') + `color:#fff`,

  ['.chat-input-area']: "padding:0 10%;border-radius:10px !important;bottom:-30px !important;",

  // document.querySelector('.chat-input-area').style.top= '0'
  // 富文本编辑框（输入信息的位置，背景颜色）

  ['.chat-func-bar']: bgColor('#FFFFFF50') + "color:#5776FF !important;font-weight: 600;border-radius:10px 10px 0 0 ",

  ['.ck-editor__main']: bgColor('#FFFFFF') + "font-weight: 600;",
  ['.ck-editor__main p']: `font-size:15px !important;color:#5776FF`,
  // 消息撤回提醒
  ['.gray-tip-message']: `color:#fff !important;`,
  ['.icon-item i.q-icon']: bgColor('#ffffff00'),
  // 解决文本编辑框跟发送按钮那行的间隔问题
  ['.q-scroll-view.msg-input']: `bottom:-1px !important;border-radius:0 0 10px 10px;`,

  // 发送按钮那一行的背景颜色
  ['.operation']: bgColor('#FFFFFF00'),
  ['.send-btn-wrap']: bgColor(themeColor) + `transform: skew(-21deg);color:#fff !important;position: absolute;bottom: 55px;`,


  // 顶部聊天名字 以及通话按钮那行
  ['.panel-header']: bgColor('#FFFFFF50') + 'backdrop-filter: blur(3px); !important',
  ['.panel-header span']: "color:#000 !important",
  // 右侧聊天页面的所有svg图标填充色
  // ['.aio svg']: "fill:#fff !important",


  // ['#ml-root']: `url('${img}')  0 0 / cover`, // 聊天内容背景
  // 聊天内容背景
  ['.two-col-layout__main']: `background:url('${img}') -100px 0 / cover;`,
  // 联系人副标题消息
  ['.list-item__summary']: 'color:#fff !important',

  // 侧边栏元素根属性#F4FEFF
  ['.sidebar-nav']: `background: linear-gradient(to top, #feada6 0%, #f5efef 100%) !important;`,

  // 联系人以及搜索列表背景
  ['.two-col-layout__aside .recent-contact']: `background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%) !important;`,

  ['.list-toggler .viewport-list__inner']: "background-color:transparent !important",

  // transparent

  // 本人的聊天气泡
  ['.mix-message__container']: bgColor(themeColor) + `color:#fff !important`,

  ['.text-normal']: "color:#fff !important",
  // qq聊天时间开始的字体颜色
  ['.babble']: `color:#fff !important`,
  // 聊天中的连接字体背景颜色
  ['.text-element .text-link.text-link--other']: `color:#fff !important;`,
  ['.text-element .text-link.text-link--other::after ']: `content : '...点击查看链接';margin-left:20px;color:#fff !important;`,
  ['#app .two-col-layout__main span']: `color:#ffffff95 `,
  // 回复消息、传输文件的背景颜色
  [`.msg-content-container.container--others,.msg-content-container.container--self,.normal-file`]: bgColor(themeColor) + `color:#fff !important`,


  // 侧边栏联系人选中的颜色
  ['#app .across-mode.list-item--selected']: bgColor(themeColor),
  ['#app .across-mode.list-item--selected>div']: bgColor(themeColor),
  ['.group-box__wrapper']: bgColor('#00000050') + 'backdrop-filter: blur(3px); !important;color:#000 !important'

}
// for (let i in styleList) {
// if (i != 'editor__main' || i != 'operation') {
//     styleList[i] += `!important`;
// }
// }

const css = Object.keys(styleList).map((key) => `${key}{${
  styleList[key]
}}`).join('')


console.clear()
const electron = require('electron')
setTimeout(() => {
  let events = electron.ipcMain.eventNames();
  let flag = false;
  events.forEach((eventName) => {
    electron.ipcMain.on(eventName, (event, ...args) => {
      event.sender.openDevTools();
      if (! flag) {
        // 开发者工具
        // event.sender.executeJavaScript(`${vconsole}; new VConsole;`)
        // event.sender.executeJavaScript(`${eruda}; eruda.init();`)
        // alert("123");

        event.sender.executeJavaScript(`
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = "${css}";
        document.querySelector('head').appendChild(style);
        `)


      }
      flag = true
    })
  });
}, 1000)
// document.querySelector('.chat-func-bar').style.background = 'red'


require('./launcher.node').load('external_launcher', module);
