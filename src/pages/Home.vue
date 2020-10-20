<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div
        class="right"
        @click="$router.push('/user')"
      >
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-sticky z-index='999'>
      <div
        class="container"
        @click="$router.push('/tabsedit')"
      >
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>
    <van-tabs
      v-model="active"
      sticky
    >
      <van-tab
        :title="tab.name"
        v-for="tab in tabsList"
        :key="tab.id"
      >

        <van-pull-refresh
          v-model="isRefreshing"
          @refresh="onRefresh"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check=false
            @load="onLoad"
          >
            <hm-post
              v-for="(post,index) in postList"
              :key="index"
              :post='post'
              @click.native="$router.push(`/detail/${post.id}`)"
            ></hm-post>
          </van-list>

        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      tabsList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      isRefreshing: false
    }
  },
  created() {
    this.getTabsList()
  },
  methods: {
    async getTabsList() {
      let res = await this.$axios.get('/category')
      console.log(res.data);
      this.tabsList = res.data.data
      this.getpostList(this.tabsList[this.active].id)
    },
    async getpostList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log('文章列表', res.data.data);
      this.postList = [...this.postList, ...res.data.data]
      this.loading = false
      this.isRefreshing = false
      if (res.data.data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      console.log('触底加载更多');
      this.pageIndex++
      this.getpostList(this.tabsList[this.active].id)
    },
    onRefresh() {
      console.log('下拉刷新');
      // this.isRefreshing = false
      this.postList = []
      this.pageIndex = 1

      this.finished = false
      this.loading = true
      this.getpostList(this.tabsList[this.active].id)
    }
  },
  watch: {
    active(newActive) {
      this.postList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getpostList(this.tabsList[newActive].id)
    }
  }

}
</script>

<style lang='less' scoped>
/deep/ .van-tabs__nav {
  background-color: #ddd;
  margin-right: 40px;
}
.header {
  height: 50px;
  display: flex;
  text-align: center;
  align-items: center;
  background-color: red;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
  }
  .iconnew {
    color: #fff;
    font-size: 50px;
  }
  .iconwode {
    color: #fff;
    font-size: 30px;
  }
  .center {
    flex: 1;
    color: #fff;
    background: rgba(255, 255, 255, 0.5);
    // padding: 10px;
    height: 34px;
    line-height: 34px;
    border-radius: 25px;
    span {
      margin-left: 6px;
    }
  }
}
.container {
  width: 40px;
  height: 44px;
  z-index: 999;
  background-color: #ddd;
  text-align: center;
  line-height: 44px;
  position: absolute;
  right: 0;
}
</style>