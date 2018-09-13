<template>
  <div class="homepage-cont">
      <div class="header-box">
        <router-view name="header"/>
      </div>
      <div class="sidebar-box">
          <router-view name="sidebar"/>
      </div>
      <div class="maincont-box" :class="[menuiscollapse ? 'box' : 'box-small']">
        <router-view name="maincont"/>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  computed: {
    menuiscollapse () {
      return this.$store.state.menuiscollapse
    }
  },
  created: function () {

  },
  mounted: function () {

  }
}
</script>

<style>
.header-box .el-menu--horizontal  {
  border: none;
}
</style>

<style scoped>
.homepage-cont,.home-elmbox{
  height: 100%;
}
.header-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
.sidebar-box{
  position: fixed;
  margin-top: 60px;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}
.maincont-box{
  padding-top: 60px;
  transition: all .3s ease-in-out;
}
.box{
  padding-left: 240px;
}
.box-small {
  padding-left: 64px;
}
</style>
