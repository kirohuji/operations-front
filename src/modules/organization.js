const module = 'c_admin/organization'
export class Node {
  constructor(node_id, p_node_id, name, is_checked, children) {
    this.node_id = node_id
    this.p_node_id = p_node_id
    this.name = name
    this.is_checked = is_checked
    this.children = children || []
  }
}
export class NodeMenu {
  constructor(o_id, name, type) {
    this.o_id = o_id
    this.name = name
    this.type = type
  }
}
export class OrganizationService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }

  //   checkedtypenode(o_id, node_id_arr) {
  //     return this.api.post(`${module}/checkedtypenode`, {
  //       o_id,
  //       node_id_arr
  //     })
  //   }
  //   deltypenode({ o_id, node_id }) {
  //     return this.api.post(`${module}/deltypenode`, {
  //       o_id,
  //       node_id
  //     })
  //   }
  //   createtypenode({ o_id, name, p_node_id }) {
  //     return this.api.post(`${module}/createtypenode`, {
  //       o_id,
  //       name,
  //       p_node_id
  //     })
  //   }
  //   editnode({ o_id, name, node_id }) {
  //     return this.api.post(`${module}/editnode`, {
  //       o_id,
  //       name,
  //       node_id
  //     })
  //   }
  // 获取机构字典
  gettablist() {
    return this.api.post(`${module}/gettablist`)
  }
  // 获取机构字典列表
  gettabtypedata(target) {
    return this.api.post(`${module}/gettabtypedata`, target)
  }
}
