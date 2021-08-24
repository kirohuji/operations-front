const module = ''
export class AuthService {
  constructor(api) {
    this.makeUserService(api)
    this.module = module
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // @flow
  login(target) {
    return this.api.post(`${this.module}/codelogin`, target)
  }
  getrbacnode() {
    return this.api.post(`${this.module}/c_admin/getrbacnode`)
  }
  updatefile(target) {
    return this.api.post(`${this.module}/c_admin/updatefile`, target)
  }
}
