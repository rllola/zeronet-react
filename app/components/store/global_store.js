import { observable, computed } from 'mobx';
import ZeroFrame from 'zeroframe';

export default class GlobalStore {
  id = Math.random();
  @observable name = 'Lola';
  @observable messages = [];
  @observable cert_user_id = null;
  @observable site = {};

  constructor() {
    ZeroFrame.cmd("siteInfo", {}, (info)=> {
      this.site = info;
    });
  }
}
