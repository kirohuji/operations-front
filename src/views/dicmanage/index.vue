<template>
  <Card class="main-layout">
    <MenusCard
      v-loading="menuData.loading"
      class="left"
      index="c_id"
      style="flex-grow: 1;"
      v-bind="dicmanage.menus"
      :is-edit="true"
      @click="handleMenu"
    />
    <div style="flex-grow: 8;">
      <Card class="right" style="height: 700px;overflow-y:scroll;padding: 25px 20px">
        <CreateCategoryButton style="margin-bottom: 16px" @click="handleCreate" />
        <div class="dicmanager-banner">
          <div>字典名称</div>
          <div>备注</div>
          <div>操作</div>
        </div>
        <el-divider />
        <DataTree :data="dicmanage.tree" layout="space-between">
          <template v-slot:operation="{ node }">
            <div style="display: flex;justify-content: space-around;width: 200px">
              <!-- <el-link type="primary">添加子类</el-link> -->
              <el-link type="primary" @click="handleUpdate(node)">编辑</el-link>
              <el-link type="primary" @click="handleDelete(node)">删除</el-link>
              <el-link type="primary" @click="handleMove(node)">上移</el-link>
            </div>
          </template>
        </DataTree>
      </Card>
      <!-- <OperationButtons /> -->
    </div>
  </Card>
</template>

<script>
import Card from '@/components/atoms/Card'
import DataTree from '@/components/organisms/DataTree'
import MenusCard from '@/vocationals/MenusCard'
import { service } from './service'
import config from './config'
// const OperationButtons = () => (
//   <div style='display: flex;justify-content: center;'>
//     <el-button>取消</el-button>
//     <el-button type='primary'>保存</el-button>
//   </div>
// )
/**
 * 新建字典分类
 */
const CreateCategoryButton = {
  inject: ['dicmanage'],
  render() {
    return (
      <el-button type='primary' icon='el-icon-plus' onClick={() => this.dicmanage.handleCreate()}>
        新建字典分类
      </el-button>
    )
  }
}
export default {
  inject: ['layout'],
  provide() {
    return {
      dicmanage: this
    }
  },
  components: {
    Card,
    DataTree,
    MenusCard,
    CreateCategoryButton
  },
  data() {
    return {
      dialog: {
        mode: 'update',
        title: '编辑用户'
      },
      config: config,
      table: {
        selected: {}
      },
      dicmanage: {
        menus: {
          current: '',
          // title: CreateCategoryButton,
          list: []
        },
        tree: []
      }
    }
  },
  computed: {
    c_id() {
      return this.dicmanage.menus.current
    }
  },
  methods: {
    handleMove(row) {
      service
        .moveupnode({
          ...row,
          c_id: this.c_id
        })
        .then(() => {
          this.$message.success('移动成功')
          this.treeData.refresh()
        })
    },
    handleCreate() {
      this.table.selected = {}
      this.dialog.title = '新建字典值类型'
      this.dialog.mode = 'insert'
      this.$refs.formDialog.open()
    },
    handleUpdate(row) {
      this.table.selected = {}
      this.table.selected = row
      this.dialog.mode = 'update'
      this.dialog.title = '编辑字典值类型'
      this.$refs.formDialog.open()
    },
    handleMenu(menu) {
      this.dicmanage.menus.current = menu.c_id
      this.treeData.refresh()
    },
    handleDelete(model) {
      this.$confirm('删除内容不可回复，确认是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          service
            .remove({
              c_id: this.c_id,
              ...model
            })
            .then((res) => {
              this.$message('删除成功')
              this.treeData.refresh()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSubmit() {
      const form = this.$refs.dataForm.model
      switch (this.dialog.mode) {
        case 'update':
          service
            .update({
              ...form,
              c_id: this.c_id
            })
            .then(() => {
              this.$message.success('编辑成功')
              this.$refs.formDialog.close()
              this.treeData.refresh()
            })
          break
        case 'insert':
          service
            .insert({
              ...form,
              c_id: this.c_id,
              p_node_id: 0
            })
            .then(() => {
              this.$message.success('新建成功')
              this.$refs.formDialog.close()
              this.treeData.refresh()
            })
          break
      }
    }
  },
  thenable: {
    menuData() {
      return {
        target: 'dicmanage.menus.list',
        runner: service.gettablist.bind(service),
        callback: (data) => {
          this.dicmanage.menus.current = data.list[0].c_id
          this.treeData.refresh()
          return data.list
        },
        immediate: true
      }
    },
    treeData() {
      return {
        target: 'dicmanage.tree',
        runner: service.gettabtypedata.bind(service),
        variables: function() {
          return {
            c_id: this.c_id
          }
        },
        callback: (data) => data.list,
        immediate: false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.dicmanager-banner {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 14px;
  color: #909399;
  padding: 0 16px;
}
.menu-title {
  color: #008dff;
  font-size: 13px;
  text-align: center;
  margin: 19px;
}
.main-layout {
  padding: 1px 0px 0px;
  display: flex;
}
.left,
.right {
  border: 1px solid #ebedf0;
  margin: 14px 12px;
}
.card-header {
  text-align: center;
  padding: 19px;
  color: #1684dd;
  font-size: 16px;
}
.card-item {
  padding: 15px 22px;
  color: #333333;
  font-size: 18px;
}
::v-deep is-checked {
  color: red;
}
</style>
<style lang="scss">
.dic-dialog {
  .el-dialog.base-dialog {
    width: 500px;
  }
  .data-form .el-form-item__label {
    width: 120px;
  }
}
</style>
