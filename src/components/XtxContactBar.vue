<template>
  <view class="contact-bar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="bar-inner">
      <view class="action-btn wechat" @tap="copyWeixinNum">
        <uni-icons type="weixin" size="20" color="#ffffff"></uni-icons>
        <text>微信联系</text>
      </view>
      <view class="action-btn phone" @tap="makeCall">
        <uni-icons type="phone" size="20" color="#ffffff"></uni-icons>
        <text>电话联系</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { copyWeixinNum, makeCall } from '@/utils/utils'
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
.contact-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(13, 13, 13, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1rpx solid rgba(201, 169, 110, 0.15);
  .bar-inner {
    display: flex;
    padding: 16rpx 32rpx;
    gap: 24rpx;
  }
  .action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    height: 80rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    color: #ffffff;
    font-weight: 500;
    letter-spacing: 2rpx;
  }
  .wechat {
    background: linear-gradient(135deg, #07c160 0%, #06ae56 100%);
  }
  .phone {
    background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
  }
}
</style>
