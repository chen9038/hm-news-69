<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      :error-message="usernameErrMsg"
      placeholder="请输入用户名"
      clearable
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      @input="checkPassword"
      clearable
      @clear="clearPassword"
    />
    <hm-button @click.native="startLogin">登录</hm-button>
    <div class="link">
      若没有账号,请先<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      username: '10086',
      password: '123',
      usernameErrMsg: '',
      passwordErrMsg: '',
    }
  },
  created() {
    const { username, password } = this.$route.params
    if (username && password) {
      this.username = username,
        this.password = password
    }
  },
  methods: {
    checkUsername() {
      const res = /^1\d{3,5}$/
      if (res.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    checkPassword() {
      const res = /^\d{3,6}$/
      if (res.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式错误'
      }
    },
    clearUsername() {
      this.usernameErrMsg = ''
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
    async startLogin() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        // console.log('登陆成功')
        this.$toast.success('校验成功')
        let res = await this.$axios
          .post('/login', {
            username: this.username,
            password: this.password,
          })

        console.log(res)
        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          // alert('登陆成功')
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user.id)
          this.$toast.success(message)
          // this.$toast.success('登陆成功')
          if (this.$route.params.back) {
            this.$router.back()
          } else {
            this.$router.push('/user')
          }
        } else {
          this.$toast.fail(message)
          // this.$toast.fail('登陆失败')
        }

      } else {
        // console.log('校验失败')
        this.$toast.loading('校验失败')
      }
    },
  },
}
</script>

<style lang='less' scoped>
.link {
  text-align: right;
  font-size: 10px;
  color: blue;
  padding: 0 25px;
}
</style>
