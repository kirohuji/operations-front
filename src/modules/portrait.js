const module = 'c_admin/portrait/portraitmanage'
export class PortraitService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // 获取机构字典
  getlist() {
    return this.api.post(`${module}/getlist`)
  }
}
