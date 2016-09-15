import { observable } from 'mobx'
import ZeroFrame from 'zeroframe'

class Site {
  @observable info = {}

  constructor () {
    ZeroFrame.cmd('siteInfo', {}, (info) => {
      console.log(info)
      this.info = info
    })
  }
}

export default Site
