const module = 'c_admin/user/usermanage'
export class User {
  constructor(user_id, name, node_id, remark, status, node_name) {
    this.user_id = user_id
    this.node_id = node_id
    this.name = name
    this.remark = remark
    this.status = status
    this.node_name = node_name
  }
}
export class UserService {
  constructor(api) {
    this.makeUserService(api)
    this.module = module
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // @flow
  insert(target) {
    return this.api.post(`${this.module}/createuser`, target)
  }
  // @flow
  delin(target) {
    return this.api.post(`${this.module}/setuseralloworno`, target)
  }
  // @flow
  update(target) {
    return this.api.post(`${this.module}/edituser`, target)
  }
  findOne(target) {
    return this.api.post(`${this.module}/getuserinfo`, target)
  }
  // 搜索、列表
  // @flow
  find(projection, options) {
    return this.api.post(`${this.module}/getlist`, {
      ...projection,
      ...options
    })
  }
}
