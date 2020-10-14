<template>
  <div>
    <hm-header>编辑资料</hm-header>
    <div class="avator">
      <img
        :src="$axios.defaults.baseURL+info.head_img"
        alt=""
      >
      <van-uploader
        class="uploader"
        :after-read="afterRead"
      />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="info.nickname"
        @click="showNickname"
      />
      <van-cell
        title="密码"
        value="******"
      />
      <van-cell
        title="性别"
        :value="info.gender===1?'男':'女'"
        @click="showGender"
      />
    </van-cell-group>
    <van-dialog
      v-model="isShowNickname"
      title="修改昵称"
      show-cancel-button
      @confirm='confirmNickname'
    >
      <van-field
        v-model="nickname"
        placeholder="请输入新昵称"
      />
    </van-dialog>

    <van-dialog
      v-model="isShowGender"
      title="修改性别"
      show-cancel-button
      @confirm='confirmGender'
    >

      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell
            title="男"
            clickable
            @click="gender = 1"
          >
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell
            title="女"
            clickable
            @click="gender = 2"
          >
            <template #right-icon>
              <van-radio :name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      isShowNickname: false,
      nickname: '',
      isShowGender: false,
      gender: 1
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    async getinfo() {
      // let token = localStorage.getItem('token')
      let user_id = localStorage.getItem('user_id')
      let res = await this.$axios.get(`/user/${user_id}`)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.info = data
      } else {
        this.$toast.fail(message)
      }

    },
    showNickname() {
      this.isShowNickname = true
      this.nickname = this.info.nickname
    },
    confirmNickname() {
      if (this.nickname === this.info.nickname) {
        this.$toast('新旧昵称不能一样')
        return
      }

      // let token = localStorage.getItem('token')
      this.ml_editUser({
        nickname: this.nickname
      })
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.info.gender
    },
    confirmGender() {
      if (this.gender === this.info.gender) {
        this.$toast('新旧性别不能一样')
        return
      }
      // let token = localStorage.getItem('token')
      this.ml_editUser({
        gender: this.gender
      })
    },

    async ml_editUser(data) {
      let user_id = localStorage.getItem('user_id')
      let res = await this.$axios.post(`/user_update/${user_id}`, data
      )
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getinfo()
        this.$toast.success(message)
      } else {
        this.$toast.fail(message)
      }

    },
    async afterRead(data) {
      console.log('图片', data.file);
      let formdata = new FormData()
      formdata.append('file', data.file)
      let res = await this.$axios.post('/upload', formdata)
      console.log('文件上传', res.data.data.url);
      this.ml_editUser({ head_img: res.data.data.url })

    },
  }
}
</script>

<style lang='less' scoped>
.avator {
  text-align: center;
  margin: 20px 0;
  position: relative;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>