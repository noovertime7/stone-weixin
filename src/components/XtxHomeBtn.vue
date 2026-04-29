<template>
  <view class="home-btn" @tap="goHome">
    <uni-icons type="home" size="22" color="#c9a96e"></uni-icons>
  </view>
</template>

<script setup lang="ts">
const goHome = () => {
  uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss">
.home-btn {
  position: fixed;
  right: 32rpx;
  bottom: 240rpx;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1rpx solid rgba(201, 169, 110, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.4);
}
</style>
