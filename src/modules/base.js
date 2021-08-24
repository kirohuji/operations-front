export class Service {
  constructor(options) {
    for (const name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name]
      }
    }
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // @flow
  insert(target) {
    return this.api.post(`${this.module}/addinformation`, target)
  }
  // @flow
  remove(target) {
    return this.api.post(`${this.module}/delinformation`, target)
  }
  // @flow
  update(target) {
    return this.api.post(`${this.module}/editinfo`, target)
  }
  findOne(target) {
    return this.api.post(`${this.module}/getinfo`, target)
  }
  find(target) {
    return this.api.post(`${this.module}/getlist`, target)
  }
}
