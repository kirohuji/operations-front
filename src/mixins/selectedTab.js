export default {
  computed: {
    type() {
      return this.$store.getters.selectedTab
    }
  },
  watch: {
    type: {
      handler() {
        this.refresh()
      },
      immediate: true
    }
  },
  methods: {
    //   用户管理  本人禁用禁止
    checkUseList(value) {
      var user = JSON.parse(localStorage.getItem('user'))
      for (let i = 0; i < value.length; i++) {
        if (value[i].user_id === user.user_id) {
          value[i].disabled = 1
        }
      }
      return value
    }
  }
}
