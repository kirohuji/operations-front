<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree ref="tree" v-bind="$attrs" :node-key="id || 'node_id'" :expand-on-click-node="false">
        <span slot-scope="{ node }" class="custom-tree-node" :style="{ 'justify-content': $attrs.layout }">
          <span>{{ node.data[name || 'name'] }}</span>
          <slot name="operation" :node="node.data" />
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['id', 'name'],
  methods: {
    getCheckedKeys(isLeaf) {
      return this.$refs.tree.getCheckedKeys(isLeaf)
    },
    getHalfCheckedKeys(isLeaf) {
      return this.$refs.tree.getHalfCheckedKeys(isLeaf)
    }
  }
}
</script>
<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
}
::v-deep .el-tree {
    .is-checked.el-tree-node {
        color: red;
    }
}
</style>
