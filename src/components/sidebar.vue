<template>
  <el-scrollbar class="scrollbarbox" :class="[iscollapseactive ? 'left-menu' : 'left-menu-small']" ref="sidebarbox">
    <div class="sidebar-cont">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo siderbar-view"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2c2c2c"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>导航四</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="4-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="4-4">
              <template slot="title">选项4</template>
              <el-menu-item index="4-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
    </div>
    <div @click="sidebarcollapse" class="siderbar-collapse-cont">
      <span></span>
    </div>
  </el-scrollbar>
</template>

<script>
import utils from '../utils/utils'
export default {
  name: '',
  data: () => {
    return {
      isCollapse: false,
      iscollapseactive: true
    }
  },
  methods: {
    handleOpen: (key, keyPath) => {
      console.log(key, keyPath)
    },
    handleClose: (key, keyPath) => {
      console.log(key, keyPath)
    },
    sidebarcollapse: function () {
      this.isCollapse = !this.isCollapse
      this.iscollapseactive = !this.iscollapseactive
      this.$store.commit('activemenucollapse')
    }
  },
  mounted: function () {
    utils.preventBodyScroll(this.$refs.sidebarbox.$refs.wrap)
  }
}
</script>
<style>
.scrollbarbox .el-scrollbar__wrap{
   overflow-x: auto;
 }
.sidebar-cont .el-menu{
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
}
</style>
<style scoped>
.scrollbarbox{
  position: relative;
  height: 100%;
  background-color: #2c2c2c;
}
.sidebar-cont{
  height: 100%;
  overflow: hidden;
}
.siderbar-collapse-cont{
  position: fixed;
  display: block;
  top: 50%;
  left: 240px;
  width: 15px;
  height: 150px;
  margin-top: -45px;
  overflow: hidden;
  cursor: pointer;
  z-index: 10;
  transition: all .3s ease-in-out;
}
.left-menu-small .siderbar-collapse-cont{
  left: 64px;
}
.siderbar-collapse-cont span{
  position: absolute;
  display: block;
  top: 0;
  left: -1px;
  width: 15px;
  height: 150px;
  background: url('../images/sidebar/side-left-shrink.png') no-repeat;
  z-index: 1000;
}
.left-menu-small .siderbar-collapse-cont span{
  background-position: 0 -151px;
}
.left-menu-small .siderbar-collapse-cont span:hover {
  background-position: -22px -151px;
}
.left-menu .siderbar-collapse-cont span:hover {
  background-position: -22px 0;
}
</style>
