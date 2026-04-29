<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()

const onSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo-area">
      <image class="logo-image" src="@/static/images/junteng.png"></image>
      <view class="logo-divider"></view>
      <text class="logo-text">骏腾石材</text>
    </view>
    <view class="search" @click="onSearch">
      <uni-icons type="search" size="18" color="rgba(255,255,255,0.5)"></uni-icons>
      <text class="placeholder">搜索大理石或安装记录</text>
    </view>
  </view>
</template>

<style lang="scss">
.navbar {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20rpx 32rpx 24rpx;
  background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
  .logo-area {
    display: flex;
    align-items: center;
    height: 72rpx;
    margin-bottom: 20rpx;
    .logo-image {
      width: 200rpx;
      height: 60rpx;
    }
    .logo-divider {
      width: 1rpx;
      height: 32rpx;
      background: rgba(201, 169, 110, 0.4);
      margin: 0 24rpx;
    }
    .logo-text {
      font-size: 28rpx;
      color: #c9a96e;
      letter-spacing: 4rpx;
      font-weight: 500;
    }
  }
  .search {
    display: flex;
    align-items: center;
    gap: 12rpx;
    height: 72rpx;
    padding: 0 28rpx;
    border-radius: 36rpx;
    background: rgba(255, 255, 255, 0.06);
    border: 1rpx solid rgba(201, 169, 110, 0.12);
    .placeholder {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.35);
    }
  }
}
</style>
