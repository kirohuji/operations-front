export default {
  props: ['runner', 'params', 'callback', 'default', 'vm'],
  data() {
    return {
      result: {
        loading: true,
        error: false,
        data: []
      }
    }
  },
  created() {
    this.result.loading = true
    if (this.default) {
      this.result.data = this.default
    }
    if (this.runner) {
      this.runner(this.params)
        .then((res) => this.callback(res.data))
        .then((res) => {
          this.result.data = res
          this.result.loading = false
        })
    }
  },
  render() {
    return this.$scopedSlots.default({
      result: this.result
    })
  }
}
