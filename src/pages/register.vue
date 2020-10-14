<template>
  <div>
    <hm-header>注册</hm-header>
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
      v-model="nickname"
      required
      label="昵称"
      :error-message="nicknameErrMsg"
      placeholder="请输入昵称"
      clearable
      @input="checknickname"
      @clear="clearnickname"
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
    <hm-button @click.native="startregister">注册</hm-button>
    <!-- <h1>注册</h1> -->
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
      usernameErrMsg: '',
      nicknameErrMsg: '',
      passwordErrMsg: '',
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
    clearUsername() {
      this.usernameErrMsg = ''
    },
    checknickname() {
      const res = /^[\u4e00-\u9fa5]{3,7}$/
      if (res.test(this.nickname)) {
        this.nicknameErrMsg = ''
      } else {
        this.nicknameErrMsg = '昵称格式错误'
      }
    },
    clearnickname() {
      this.nicknameErrMsg = ''
    },
    checkPassword() {
      const res = /^\d{3,6}$/
      if (res.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式错误'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
    async startregister() {
      if (
        this.username !== '' &&
        this.nickname !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.nicknameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        this.$toast.success('校验成功')
        let res = await this.$axios
          .post('/register', {
            username: this.username,
            password: this.password,
            nickname: this.nickname,
          })

        const { message, statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          // this.$router.push({
          //   path: '/login',
          //   query: {
          //     username: this.username,
          //     password: this.password,
          //   },
          // })
          this.$router.push({
            name: 'Login',
            params: {
              username: this.username,
              password: this.password,
            }
          })

        } else {
          this.$toast.fail(message)
        }

      } else {
        this.$toast.loading('校验失败')
      }
    },
  },
}
</script>

<style></style>
