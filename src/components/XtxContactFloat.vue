<template>
  <view class="contact-float" :class="{ expanded }" @tap.stop="toggle">
    <view class="float-btn">
      <uni-icons type="phone" size="24" color="#ffffff"></uni-icons>
    </view>
    <view class="float-actions" v-if="expanded">
      <view class="action-item wechat" @tap.stop="onWechat">
        <uni-icons type="weixin" size="20" color="#ffffff"></uni-icons>
        <text>微信</text>
      </view>
      <view class="action-item phone" @tap.stop="onPhone">
        <uni-icons type="phone" size="20" color="#ffffff"></uni-icons>
        <text>电话</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { copyWeixinNum, makeCall } from '@/utils/utils'

const expanded = ref(false)

const toggle = () => {
  expanded.value = !expanded.value
}

const onWechat = () => {
  copyWeixinNum()
  expanded.value = false
}

const onPhone = () => {
  makeCall()
  expanded.value = false
}
</script>

<style lang="scss">
.contact-float {
  position: fixed;
  right: 32rpx;
  bottom: 300rpx;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;

  .float-btn {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 32rpx rgba(201, 169, 110, 0.4);
    transition: transform 0.3s;
  }

  &.expanded .float-btn {
    transform: rotate(45deg);
  }

  .float-actions {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    animation: fadeInUp 0.25s ease;

    .action-item {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4rpx;
      text {
        font-size: 18rpx;
        color: #ffffff;
      }
    }
    .wechat {
      background: linear-gradient(135deg, #07c160 0%, #06ae56 100%);
      box-shadow: 0 4rpx 20rpx rgba(7, 193, 96, 0.4);
    }
    .phone {
      background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
      box-shadow: 0 4rpx 20rpx rgba(201, 169, 110, 0.4);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
