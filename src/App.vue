<template>
  <!-- 出口 -->
  <keep-alive include="home">
    <router-view></router-view>
  </keep-alive>
  <!-- <router-view></router-view> -->
</template>

<script>
export default {}
</script>

<style>
.one {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
