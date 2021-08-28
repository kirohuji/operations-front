<template>
  <Card class="main-layout">
    <MenusCard
      v-loading="menuData.loading"
      class="left"
      index="o_id"
      style="width: 260px;"
      v-bind="organmanage.menus"
      @click="handleMenu"
    />
    <div style="width: calc(100% - 260px)">
      <Card class="right" style="height: 700px;overflow-y:scroll;padding: 25px 20px">
        <DataTree v-loading="treeData.loading" :data="organmanage.tree" />
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
// const OperationButtons = () => (
//   <div style='display: flex;justify-content: center;'>
//     <el-button>取消</el-button>
//     <el-button type='primary'>保存</el-button>
//   </div>
// )

export default {
  components: {
    Card,
    DataTree,
    MenusCard
    // OperationButtons
  },
  data() {
    return {
      organmanage: {
        menus: {
          current: '',
          title: '机构字典',
          list: []
        },
        tree: []
      }
    }
  },
  computed: {
    o_id() {
      return this.organmanage.menus.current
    }
  },
  methods: {
    handleMenu(menu) {
      this.organmanage.menus.current = menu.o_id
      this.treeData.refresh()
    }
  },
  thenable: {
    menuData() {
      return {
        target: 'organmanage.menus.list',
        runner: service.gettablist.bind(service),
        callback: (data) => {
          this.organmanage.menus.current = data.list[0].o_id
          this.treeData.refresh()
          return data.list
        },
        immediate: true
      }
    },
    treeData() {
      return {
        target: 'organmanage.tree',
        runner: service.gettabtypedata.bind(service),
        variables: function() {
          return {
            o_id: this.o_id
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
.menu-title {
    color: #008dff;
    font-size: 14px;
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
