<template>
  <div>
    <div class="header">
      <div
        class="left"
        @click="$router.back()"
      >
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div
          v-if="detail.has_follow"
          class="follow"
          @click="unfollow"
        >已关注</div>
        <div
          v-else
          class="follow"
          @click="follow"
        >关注</div>
      </div>
    </div>
    <div class="container">
      <div class="title line2">
        {{detail.title}}
      </div>
      <div class="name">
        <span>{{detail.user.nickname}}</span>
        <span>{{detail.user.create_date}}</span>
      </div>

      <div
        v-if="detail.type===1"
        class="content"
        v-html="detail.content"
      ></div>
      <video
        v-else
        :src="detail.content"
        controls
      ></video>
      <div class="bottom">
        <div
          class="like"
          @click="like"
          :class="{active:detail.has_like}"
        >
          <i class="iconfont icondianzan"></i>
          <i>{{detail.like_length}}</i>
        </div>
      </div>
    </div>
    <div class="comment">
      <hm-comment
        v-for="comment in commentLists"
        :key="comment.id"
        :comment='comment'
      ></hm-comment>
    </div>
    <div class="footer">
      <div
        class="input"
        v-if="!isShow"
      >
        <div class="left">
          <input
            ref="input"
            @focus="handleFocus"
            type="text"
            placeholder="写跟贴"
          >
        </div>
        <div class="center">
          <van-icon
            name="chat-o"
            badge="9"
          />
        </div>
        <div class="right">
          <van-icon name="star-o" />
        </div>
      </div>
      <div
        class="textarea"
        v-else
      >
        <div class="left">
          <textarea
            ref="textarea"
            placeholder="请输入内容"
            @blur="handleBlur"
          ></textarea>
        </div>
        <div class="right">
          <div class="send">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        user: {}
      },
      commentLists: [],
      isShow: false
    }
  },
  created() {
    this.getDetail()
    this.getComments()
  },
  methods: {
    async getDetail() {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`)
      console.log('文章详情', res.data.data);
      this.detail = res.data.data
    },
    async unfollow() {
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
      console.log('未关注', res);
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async follow() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'Login',
          params: {
            back: true
          }
        })
        return
      }

      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`)
      console.log('关注', res);
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async like() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'Login',
          params: {
            back: true
          }
        })
        return
      }

      let res = await this.$axios.get(`/post_like/${this.detail.id}`)
      console.log('点赞', res.data);
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async getComments() {
      let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      console.log('评论列表', res.data.data);
      this.commentLists = res.data.data
    },
    handleFocus() {
      this.isShow = true
    },
    handleBlur() {
      this.isShow = false

    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    width: 40px;
    text-align: center;
    color: #000;
  }
  .center {
    flex: 1;
    i {
      font-size: 50px;
    }
  }
  .right {
    .follow {
      width: 60px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      text-align: center;
      border: 1px solid #999;
      margin-right: 20px;
    }
  }
}
.container {
  padding: 10px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0 20px 0;
  }
  .name {
    color: #999;
    span {
      margin-right: 10px;
    }
  }
  .content {
    margin-top: 20px;
  }
}
/deep/ img {
  width: 100%;
}
video {
  width: 100%;
  margin-top: 10px;
}
.bottom {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  .like {
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    i {
      margin: 0 5px;
    }
  }
  .like.active {
    border: 1px solid red;
    i {
      color: red;
    }
  }
}
.comment {
  border-top: 3px solid #ccc;
  padding-bottom: 40px;
}
.footer {
  // padding: bottom 40px;
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 80%;
        height: 30px;
        border: none;
        border-radius: 15px;
        background: #ddd;
        text-indent: 1em;
      }
    }
    .center,
    .right {
      width: 60px;
      line-height: 40px;
      font-size: 24px;
      text-align: center;
    }
  }
  .textarea {
    height: 70px;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        border: none;
        width: 90%;
        height: 75%;
        background: #ddd;
        border-radius: 10px;
        resize: none;
        padding-top: 5px;
        text-indent: 1em;
      }
    }
    .right {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .send {
        background: red;
        color: #fff;
        width: 40px;
        height: 30px;
        border-radius: 8px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>