import Clipboard from 'clipboard'
import {Message} from 'element-ui'

const clipboard = {
  initWithClassName (className) {
    let clipboardBtn = new Clipboard(className)

    clipboardBtn.on('success', e => {
      Message({
        message: '复制成功',
        type: 'success',
        center: true,
        duration: 2 * 1000
      })
    })

    clipboardBtn.on('error', e => {
      Message({
        message: '复制失败',
        type: 'error',
        center: true,
        duration: 2 * 1000
      })
    })
  }
}

export default clipboard
