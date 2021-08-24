import { Service } from './base'
const module = 'c_admin/information/infomanage'
export class Infomanage {
  constructor(i_id, node_id, title, image, content, status) {
    this.i_id = i_id
    this.node_id = node_id
    this.title = title
    this.image = image
    this.content = content
    this.status = status
  }
}
export class InfomanageService extends Service {
  constructor({ api }) {
    super({ api, module })
  }
  //  分类列表
  getcategorylist() {
    return this.api.post(`${this.module}/getcategorylist`)
  }
  //  发布主体列表
  getpublist() {
    return this.api.post(`${this.module}/getpublist`)
  }
  //  下架
  setpull(target) {
    return this.api.post(`${this.module}/setpull`, target)
  }
  getmembertagcount(target) {
    return this.api.post(`${this.module}/getmembertagcount`, target)
  }
  getmembertag(target) {
    return this.api.post(`${this.module}/getmembertag`, target)
  }
}
