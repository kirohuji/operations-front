<template>
  <div>
    <EditTable ref="editTable" :config="config" />
  </div>
</template>

<script>
import config from './config'
import { service } from './service'
import selectedTab from '../../mixins/selectedTab'
export default {
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
    },
    handleUpdate(row) {
      service
        .findOne({
          ...row,
          type: this.type
        })
        .then(({ data }) => {
          console.log(data)
          this.table.selected = data
          this.$refs.formDialog.open()
          this.key++
          this.$nextTick(() => {
            this.$refs.dataForm.resetFields()
          })
        })
    }
  }
}
</script>
