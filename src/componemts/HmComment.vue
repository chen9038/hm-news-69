<template>
  <div class="hm-comment">
    <div class="header">
      <div class="left">
        <img
          :src="$axios.defaults.baseURL+comment.user.head_img"
          alt=""
        >
      </div>
      <div class="
        center">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="date">{{comment.create_date}}</div>
      </div>
      <div class="right">
        回复
      </div>
    </div>
    <hm-floor
      :count='getCount(0,comment)'
      v-if="comment.parent"
      :parent='comment.parent'
    ></hm-floor>

    <div class="content">
      {{comment.content}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    getCount(num, parent) {
      if (parent.parent) {
        return this.getCount(num + 1, parent.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .header {
    padding: 10px;
    display: flex;
    align-items: center;

    .left {
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      height: 50px;
      line-height: 25px;
      .name {
        font-size: 14px;
      }
      .date {
        color: #999;
      }
    }
    .right {
      width: 50px;
      color: #999;
    }
  }
  .content {
    margin: 10px 0;
  }
}
</style>