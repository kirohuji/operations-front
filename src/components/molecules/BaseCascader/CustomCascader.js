import { Cascader } from 'element-ui'
import _ from 'lodash'
export default {
  extends: Cascader,
  watch: {
    checkedValue(val) {
      console.log('啦啦啦啦啦')
      const { value, dropDownVisible } = this
      const { checkStrictly, multiple } = this.config

      if (!_.isEqual(val, value) || _.isUndefined(value)) {
        this.computePresentContent()
        // hide dropdown when single mode
        if (!multiple && !checkStrictly && dropDownVisible) {
          this.toggleDropDownVisible(false)
        }

        this.$emit('input', val)
        this.$emit('change', val)
        this.dispatch('ElFormItem', 'el.form.change', [val])
      }
    }
  },
  beforeCreate() {
    this.$on('change', () => {
      console.log('收到change')
    })
  }
}
