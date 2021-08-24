const module = 'c_admin/category'
export class Node {
    node_id = ''
    p_node_id = ''
    name = ''
    children = []
}
export class DicmanageService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // 删除字典类型节点
  remove(target) {
    return this.api.post(`${module}/deltypenode`, target)
  }
  // 新增字典类型节点
  insert({ c_id, name, p_node_id }) {
    return this.api.post(`${module}/createtypenode`, {
      c_id,
      name,
      p_node_id
    })
  }
  // 上移字典类型节点
  moveupnode({ c_id, node_id }) {
    return this.api.post(`${module}/moveupnode`, {
      c_id,
      node_id
    })
  }
  // 修改字典类型节点
  update(target) {
    return this.api.post(`${module}/edittypenode`, target)
  }
  // 获取字典类型分类左侧列表
  gettablist() {
    return this.api.post(`${module}/gettablist`)
  }
  // 获取字典类型分类节点列表
  gettabtypedata(target) {
    return this.api.post(`${module}/gettabtypedata`, target)
  }
}
