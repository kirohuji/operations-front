<template>
  <div :class="{ 'has-logo': showLogo }" style="display: flex;flex-direction: column;">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/variables.scss'
// import { constantRoutes } from '@/router'
export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.hamburger-container {
  line-height: 46px;
  // height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
<style>
#app .sidebar-container .is-active > .el-submenu__title {
  color: rgb(0, 141, 255) !important;
}
.el-submenu .el-submenu__title .sub-el-icon,
.submenu-title-noDropdown .sub-el-icon,
.submenu-title-noDropdown {
  color: #333 !important;
}
.el-submenu.is-active .el-submenu__title .sub-el-icon,
.submenu-title-noDropdown.is-active .sub-el-icon,
.submenu-title-noDropdown.is-active {
  color: rgb(0, 141, 255) !important;
}
.el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  transform: rotateZ(0deg) !important;
  color: rgb(0, 141, 255);
}
.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  transform: rotateZ(-90deg) !important;
  color: #333;
}
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title:hover,
#app .sidebar-container .el-submenu .el-menu-item:hover,
#app .sidebar-container .submenu-title-noDropdown:hover,
#app .sidebar-container .el-submenu__title:hover,
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title,
#app .sidebar-container .el-submenu .router-link-exact-active .el-menu-item {
  background-color: #e0edf8 !important;
}
#app .sidebar-container .el-submenu .router-link-exact-active .el-menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background: #008dff;
}
.el-submenu.is-opened {
}
</style>
