<template>
  <div>
    <hm-header>我的跟贴</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <div class="date">{{item.create_date}}</div>
        <div
          class="parent"
          v-if="item.parent"
        >
          <div class="parent-nickname">
            回复:{{item.parent.user.nickname}}
          </div>
          <div class="parent-content line2">
            {{item.parent.content}}
          </div>
        </div>
        <div class="content">
          {{item.content}}
        </div>
        <div class="post">
          <div class="title line1">
            {{item.post.title}}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      let res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: 5
        }
      })
      // console.log('跟帖', res.data);
      if (res.data.statusCode === 200) {
        console.log(this.list);
        this.loading = false
        if (res.data.data.length < 5) {
          this.finished = true
        }
        this.list = [...this.list, ...res.data.data]
      }
    },
    onLoad() {
      console.log('触底了 加载更多')
      this.pageIndex++
      this.getCommentList()
    }
  }
}
</script>

<style lang='less' scoped>
.item {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  .date {
    color: #999;
    height: 20px;
    line-height: 20px;
  }
  .parent {
    background-color: #ddd;
    padding: 10px;
    color: #999;
    &-nickname {
      height: 20px;
      line-height: 20px;
    }
    &-content {
      font-size: 14px;
      line-height: 25px;
    }
  }

  .content {
    font-size: 14px;
    padding: 10px 0;
  }
  .post {
    display: flex;
    color: #999;
    .title {
      flex: 1;
    }
    .iconfont {
      width: 20px;
      text-align: center;
    }
  }
}
</style>