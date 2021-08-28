<template>
  <el-dialog :visible.sync="visible" :before-close="close" :mode="$attrs.mode" custom-class="base-dialog" append-to-body>
    <slot />
    <template v-slot:title>
      <div style="position: relative;">
        <div
          v-if="isReturn"
          style="
            position: absolute;
            left: 2px;
            top: 20px;
            color: #008DFF;
        "
          @click="() => (visible = !visible)"
        >
          <i class="el-icon-arrow-left" />
          <span>返回</span>
        </div>
        <div class="title">{{ $attrs.title }}</div>
      </div>
    </template>
    <template v-slot:footer>
      <slot name="footer">
        <div class="footer">
          <el-button @click="() => (visible = !visible)">取消</el-button>
          <el-button type="primary" @click="() => (visible = !visible)">保存</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export const dialogVisibleMixin = {
  inject: ['reactiveDialogVisible'],
  computed: {
    dialogVisible() {
      return this.reactiveDialogVisible()
    }
  }
}

export default {
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ['isReturn'],
  provide() {
    return {
      reactiveDialogVisible: () => this.visible
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    close(done) {
      if (this.visible) {
        this.visible = false
        this.$emit('close')
        done && done()
      }
      // this.$confirm('确认关闭？')
      //     .then((_) => {
      //         done()
      //     })
      //     .catch((_) => {})
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss">
.base-dialog {
    .el-dialog__header {
        // height: 40px;
        padding: 8px 16px;
        text-align: left;
        // background-color: rgba(242, 242, 242, 1);
        .title {
            padding: 20px;
            text-align: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px solid #ccd3d9;
        }
        .el-dialog__title {
            font-size: 14px;
            font-weight: 700;
            color: rgba(56, 56, 56, 1);
        }

        .el-dialog__headerbtn {
            top: 8px;
            right: 8px;
            font-size: 22px;
            .el-dialog__close {
                color: #ccd3d9;
            }
        }
    }

    .el-dialog__body {
        padding: 8px 30px;
        padding-bottom: 10px;
    }
    .el-dialog__footer {
        display: flex;
        justify-content: center;
        .el-button--medium {
            padding: 10px 32px;
        }
    }
}
</style>
