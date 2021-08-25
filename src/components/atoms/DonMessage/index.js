import { Message } from 'element-ui'
const showMessage = Symbol('showMessage')

class ExternelMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
}
export class DonMessage extends ExternelMessage {
  [showMessage](type = 'info', options, single) {
    if (document.getElementsByClassName('el-message').length === 0) {
      Message[type](options)
    } else {
      Message[type](options)
    }
  }
}

const MessagePlugin = {}
MessagePlugin.install = function(Vue) {
  Vue.prototype.$donMessage = new DonMessage()
}
export default MessagePlugin
