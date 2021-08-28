import Card from '@/components/atoms/Card'
import collector from 'lourd_components/src/components/organisms/DataForm/collector'
import Store from './model/store'
import emitter from 'element-ui/src/mixins/emitter'
import { find } from 'lodash'
export default {
  name: 'EditTable',
  props: {
    config: Object,
    permission: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    page: {
      from: 'page',
      default: {}
    }
  },
  provide() {
    return {
      template: this
    }
  },
  components: { Card },
  mixins: [emitter, collector],
  data() {
    const store = new Store(this.config)
    return {
      store,
      currentSelect: {},
      hasOperation: false,
      currentState: {
        dataSearchForm: {}
      }
    }
  },
  methods: {
    dialogClose() {
      this.$refs.dialog.innerDialogClose()
    },
    handleSubmit(payload) {
      this.$emit('events', {
        name: 'submit',
        componentName: 'DataDialog',
        currentSelect: this.currentSelect,
        data: payload
      })
    },
    handleOperation({ row, mode }) {
      this.$emit('events', {
        name: mode,
        componentName: 'DataTable',
        data: row
      })
    },
    handleDataTableChange(payload) {
      this.$emit('events', {
        name: 'change',
        componentName: 'DataTable',
        data: payload
      })
    },
    handleEdit(payload) {
      this.currentSelect = payload
      this.handleDialog({
        mode: 'edit',
        title: this.store.dialog.edit,
        form: {
          ...this.store.forms,
          data: payload
        }
      })
    },
    handleDialog(opt) {
      this.$nextTick(() => {
        this.currentState.dataSearchForm = this.collect().dataSearchForm.currentData()
        if (this.$refs.dialog) {
          this.$refs.dialog.open(opt)
        }
      })
    },
    refresh() {
      const collectors = this.collect()
      return {
        dataSearchForm: collectors.dataSearchForm.currentData(),
        dataTable: collectors.dataTable.pagination
      }
    }
  },
  created() {
    if (!find(this.store.table.column, ['prop', 'operation']) && !this.hasOperation) {
      this.store.table.column.push({
        prop: 'operation',
        label: '操作',
        scopedSlots: true,
        select: '',
        value: '',
        width: '150px',
        current: null
      })
      this.hasOperation = true
    }
  },
  render() {
    return (
      <div style='background: rgb(255, 255, 255);padding: 0px 14px 14px;'>
        <DataDialog ref='dialog' onSubmit={(payload) => this.handleSubmit(payload)} />
        <Card style='padding: 14px;padding-bottom: 0'>
          <DataSearchForm
            {...{
              props: this.store.searcher,
              on: this.$listeners,
              scopedSlots: {
                right:
                  this.store.searcher.create &&
                  (() => (
                    <el-button
                      type='primary'
                      onClick={() => {
                        this.currentSelect = {}
                        this.handleDialog({
                          mode: 'add',
                          title: this.store.dialog.add,
                          form: {
                            ...this.store.forms,
                            data: {}
                          }
                        })
                      }}
                    >
                      {this.store.searcher.create}
                    </el-button>
                  ))
              }
            }}
          ></DataSearchForm>
        </Card>
        <Card style='pading: 14px;padding-top: 0'>
          <DataTable
            {...{
              props: {
                collector: 'dataTable',
                ...this.store.table
              },
              on: {
                change: this.handleDataTableChange,
                ...this.$listeners
              },
              scopedSlots: {
                operation: ({ row }) => (
                  <div class='operation' style='display: flex;justify-content: space-between;'>
                    {this.permission.includes('authorize') && <el-link type='primary'>授权</el-link>}
                    {this.permission.includes('edit') && (
                      <el-link
                        type='primary'
                        disabled={row.disabled === 1}
                        onClick={() =>
                          this.handleOperation({
                            row,
                            mode: 'findOne'
                          })
                        }
                      >
                        编辑
                      </el-link>
                    )}
                    {this.permission.includes('effective') && (
                      <el-link
                        type='primary'
                        disabled={row.disabled === 1}
                        onClick={() => this.handleOperation({ mode: 'trigger', row })}
                      >
                        {row.status === 'ban' ? '开启' : '禁用'}
                      </el-link>
                    )}
                    {this.permission.includes('remove') && <el-link type='danger'>删除</el-link>}
                  </div>
                ),
                ...this.$scopedSlots
              }
            }}
          />
        </Card>
      </div>
    )
  }
}
