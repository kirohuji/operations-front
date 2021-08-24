<template>
  <div class="navbar">
    <div v-if="sidebar.opened" class="title">运营管理后台</div>
    <tags-view v-if="needTagsView" />
    <div class="right-menu">
      <RightTabWithApi />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper" style="">
          <div style="margin-left: 8px">{{ user.name }}</div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
// import Hamburger from '@/components/Hamburger'
import TagsView from './TagsView'
import { service } from '../service'
const RightTab = {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(item) {
      localStorage.setItem('selectedTab', item)
      this.selectedTab = String(item)
      this.$store.dispatch('user/changeTabs', item)
    }
  },
  data() {
    return {
      selectedTab: ''
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      service.getrbacnode().then(({ data }) => {
        this.$store.dispatch('permission/generateRoutes', data.list)
      })
    }
    this.selectedTab = localStorage.getItem('selectedTab')
    if (!this.selectedTab) {
      this.handleClick(this.list[0].type)
    } else {
      this.$store.dispatch('user/changeTabs', this.selectedTab)
    }
  },
  render() {
    return (
      <ElSelect
        class='user_zoom'
        vModel={this.selectedTab}
        placeholder='请选择'
        {...{
          on: {
            change: (item) => this.handleClick(item)
          }
        }}
      >
        {this.list.map((item) => (
          <ElOption key={item.type} label={`${item.name}视角`} value={String(item.type)} />
        ))}
      </ElSelect>
    )
  }
}

const RightTabWithApi = {
  computed: {
    admin_role_arr() {
      return JSON.parse(localStorage.getItem('user')).admin_role_arr
    }
  },
  render() {
    return <RightTab list={this.admin_role_arr} />
  }
}
export default {
  components: {
    TagsView,
    // Hamburger,
    RightTabWithApi
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    ...mapState({
      needTagsView: (state) => state.settings.tagsView
    }),
    user() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      localStorage.clear()
      // console.log('退出')
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $menuActiveText;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  .title {
    width: 176px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #ffffff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: revert;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &:focus {
      outline: none;
    }
    .user_zoom {
      ::v-deep .el-input__inner {
        border: none !important;
        background: none !important;
        color: white;
        width: 115px;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: white;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style>
.right-menu .el-input .el-select__caret {
  display: block;
}
</style>
