<template>
  <view class="tab-bar">
    <view
      class="tab-item"
      v-for="(item, index) in tabs"
      :key="index"
      :class="current == index ? 'tab-item-active' : ''"
      @click="$emit('change', index)"
    >
      <text class="tab-text">{{ item.name }}</text>
      <view
        v-if="index == current"
        class="tab-line"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'tab',
  props: {
    current: {
      type: Number,
      default: 0,
    },
    tabs: Array,
  },
}
</script>

<style>
.tab-bar {
  display: flex;
  border-bottom: 1rpx solid rgba(201, 169, 110, 0.08);
  background: #1a1a1a;
}
.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}
.tab-text {
  font-size: 28rpx;
  letter-spacing: 2rpx;
}
.tab-line {
  width: 48rpx;
  height: 6rpx;
  background: linear-gradient(90deg, #c9a96e, #d4af37);
  border-radius: 6rpx;
  position: absolute;
  bottom: 0;
}
.tab-item-active {
  color: #c9a96e;
  font-weight: 600;
}
</style>
