<template>
  <div>
    <hm-floor
      :count='count-1'
      v-if="parent.parent"
      :parent='parent.parent'
    ></hm-floor>
    <div
      class="hm-floor"
      :class="{top:!parent.parent}"
    >
      <div class="header">
        <div class="left">{{count}}楼 {{parent.user.nickname}}</div>
        <div class="center">{{parent.create_date}}</div>
        <div
          class="right"
          @click="reply"
        >回复</div>
      </div>
      <div class="content">
        {{parent.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parent', 'count'],
  name: 'hm-floor',
  methods: {
    reply() {
      this.$bus.$emit('reply', this.parent.id, this.parent.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-floor {
  border: 1px solid #000;
  padding: 10px;
  border-top: none;
  &.top {
    border-top: 1px solid red;
  }
  .header {
    display: flex;
    align-items: center;
    .left {
      font-size: 14px;
      flex: 1;
    }
    .center {
      flex: 2;
      margin-left: 10px;
      color: #999;
    }
    .right {
      width: 50px;
    }
  }
  .content {
    padding-top: 10px;
  }
}
</style>