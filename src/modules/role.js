const module = 'c_admin/user/rolemanage'
export class Role {
  constructor(r_id, name, node_id, describe, node_name) {
    this.r_id = r_id
    this.node_id = node_id
    this.name = name
    this.describe = describe
    this.node_name = node_name
  }
}
export class RoleService {
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
    return this.api.post(`${this.module}/createrole`, target)
  }
  // @flow
  delin(target) {
    return this.api.post(`${this.module}/delrole`, target)
  }
  // @flow
  update(target) {
    return this.api.post(`${this.module}/editrole`, target)
  }
  findOne(target) {
    return this.api.post(`${this.module}/getroleinfo`, target)
  }
  // 搜索、列表
  // @flow
  find(projection, options) {
    return this.api.post(`${this.module}/getlist`, {
      ...projection,
      ...options
    })
  }
  setrbacrole(target) {
    return this.api.post(`${this.module}/setrbacrole`, target)
  }
  getrbacrole(target) {
    return this.api.post(`${this.module}/getrbacrole`, target)
  }
}
