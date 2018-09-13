<template>
<div class="login-wrap">
  <transition name="fade" mode="out-in" appear>
    <el-card class="box-card" v-show="isloginshow">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <el-input
            class="input-class"
            placeholder="请输入用户名"
            prefix-icon="el-icon-erp-yonghu"
            v-model="username">
          </el-input>
          <el-input
            class="input-class"
            placeholder="请输入密码"
            prefix-icon="el-icon-erp-mima"
            v-model="userpwd">
          </el-input>
          <el-button @click="login" class="submit-btn" type="primary">登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-input
            class="input-class"
            placeholder="请输入用户名"
            prefix-icon="el-icon-erp-yonghu"
            v-model="username">
          </el-input>
          <el-input
            class="input-class"
            placeholder="请输入密码"
            prefix-icon="el-icon-erp-mima"
            v-model="userpwd">
          </el-input>
          <el-input
            class="input-class"
            placeholder="请输入用户名"
            prefix-icon="el-icon-erp-mima"
            v-model="username">
          </el-input>
          <el-button class="submit-btn" type="primary">注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </transition>
</div>
</template>

<script>
export default {
  name: '',
  data: () => {
    return {
      activeName2: 'first',
      username: '',
      userpwd: '',
      isloginshow: false
    }
  },
  methods: {
    handleClick: (tab, event) => {
      console.log(tab, event)
    },
    login: function () {
      this.$router.push('index')
    }
  },
  created: function () {
    this.isloginshow = true
  },
  mounted: () => {

  }
}
</script>

<style lang="scss" type="text/scss" >
  .el-tabs__nav{
    width: 100%;
  }
  .el-tabs__item{
    width: 50%;
  }
</style>

<style lang="scss" type="text/scss" scoped>
  /*@import "../style/base/global.scss";*/
  $loginbgcolor: #324057;
  .login-wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: $loginbgcolor;
  }
  .box-card{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    height: 350px;
  }
  .input-class{
    margin-bottom: 15px;
  }
  .submit-btn{
    width: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1s ease-in-out;
  }
  .fade-enter, .fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
