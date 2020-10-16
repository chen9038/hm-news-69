<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <div class="left">
          <img
            :src="$axios.defaults.baseURL+item.head_img"
            alt=""
          >
        </div>
        <div class="center">
          <div class="nickname">{{item.nickname}}</div>
          <div class="date">{{item.create_date | date}}</div>
        </div>
        <div
          class="right"
          @click="unfollow(item.id)"
        >
          取消关注
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getMyfollowList()
    this.follow()
  },
  methods: {
    async getMyfollowList() {
      let res = await this.$axios.get('/user_follows')
      console.log(res);
      this.list = res.data.data
    },
    async unfollow(id) {
      await this.$dialog.confirm({
        title: "提示",
        message: '您确定要取消关注吗'
      })

      let res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log('取消关注');
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getMyfollowList()
      } else {
        this.$toast.fail(message)
      }

    },
    async follow() {
      let res = await this.$axios.get('/user_follows/19')
      this.getMyfollowList()
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  .item {
    height: 90px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .center {
      flex: 1;
      height: 50px;
      line-height: 25px;
      padding-left: 20px;
      .nickname {
        font-size: 14px;
      }
      .date {
        color: #999;
      }
    }
    .right {
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #ddd;
    }
  }
}
</style>