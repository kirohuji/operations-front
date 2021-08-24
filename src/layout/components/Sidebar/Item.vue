<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon') || icon.includes('iconfont ')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} style='font-size: 16px' />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} style='font-size: 16px' />)
      }
    }

    if (title) {
      vnodes.push(
        <span slot='title' style='font-size: 16px'>
          {title}
        </span>
      )
    }
    return vnodes
  }
}
</script>

<style scoped lang="scss">
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
    font-size: 23px !important;
    // margin: 0 9px !important;
    color: #008dff !important;
}
.svg-icon {
    color: #008dff !important;
    font-size: 16px !important;
    margin: 0 9px;
}
</style>
