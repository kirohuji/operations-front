<template>
  <div>
    <EditTable
      ref="editTable"
      v-loading="tableData.loading"
      :config="config"
      :permission="['authorize', 'edit', 'effective', 'remove']"
      @events="handleEvents"
    />
  </div>
</template>

<script>
import selectedTab from '../../mixins/selectedTab'
import EditTable from '@/components/templates/EditTable'
import config from './config'
import { service } from './service'
export default {
  components: { EditTable },
  mixins: [selectedTab],
  data() {
    return {
      config
    }
  },
  thenable: {
    tableData() {
      return {
        target: 'config.table',
        runner: service.find.bind(service),
        variables: function() {
          return {
            type: this.type
          }
        },
        callback: (res) => {
          return {
            data: this.checkUseList(res.list),
            total: res.total
          }
        },
        immediate: false
      }
    }
  },
  methods: {
    handleEvents(payload) {
      switch (payload.name) {
        // 对话框提交
        case 'submit':
          payload.data.validate().then((valid) => {
            if (valid) {
              // eslint-disable-next-line no-case-declarations
              const form = {
                ...payload.currentSelect,
                ...payload.data.data
              }
              if (Array.isArray(form.node_id)) {
                form.node_id = form.node_id[form.node_id.length - 1]
              }
              switch (payload.data.mode) {
                // 编辑模式
                case 'edit':
                  service
                    .update({
                      ...form,
                      type: this.type
                    })
                    .then(() => {
                      this.$message.success('编辑成功')
                      this.$refs.editTable.dialogClose()
                      this.refresh()
                    })
                  break
                // 新增模式
                case 'add':
                  service
                    .insert({
                      ...form,
                      type: this.type
                    })
                    .then(() => {
                      this.$message.success('新建成功')
                      this.$refs.formDialog.dialogClose()
                      this.refresh()
                    })
                  break
              }
            }
          })
          break
        // 获取当前用户的详细信息
        case 'findOne':
          service
            .findOne({
              ...payload.data,
              type: this.type
            })
            .then(({ data }) => {
              this.$refs.editTable.handleEdit({
                ...payload.data,
                ...data
              })
            })
          break
        // 禁用/启用
        case 'trigger':
          service
            .delin({
              type: payload.data.status === 'ban' ? 1 : 2,
              user_id: payload.data.user_id,
              ...this.searcher
            })
            .then(() => {
              this.$message.success('操作成功')
              this.refresh()
            })
          break
        default:
          this.refresh()
      }
    },
    //   用户管理  本人禁用禁止
    checkUseList(value) {
      var user = JSON.parse(localStorage.getItem('user'))
      for (let i = 0; i < value.length; i++) {
        if (value[i].user_id === user.user_id) {
          value[i].disabled = 1
        }
      }
      return value
    },
    // 刷新Table
    refresh() {
      this.$nextTick(() => {
        const payload = this.$refs.editTable.refresh()
        const node_id =
          String(this.type) === '1' ? '0' : payload.dataSearchForm.node_name[payload.dataSearchForm.node_name.length - 1]

        this.tableData.refresh({
          ...payload.dataTable,
          ...payload.dataSearchForm,
          node_id
        })
      })
    }
  }
}
</script>
