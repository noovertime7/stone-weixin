<script setup lang="ts">
import { ref } from 'vue'
import type { Stone } from '@/types/stone'

const activeIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}

defineProps<{
  list: Stone[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" autoplay :interval="4000" @change="onChange" v-if="list.length">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator :url="`/pages/stone/stone?id=${item.id}`" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.coverImages[0]"></image>
          <view class="image-overlay">
            <text class="stone-name">{{ item.name }}</text>
          </view>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text
        v-for="(item, index) in list.length"
        :key="item"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
.carousel {
  height: 480rpx;
  position: relative;
  overflow: hidden;
  margin: 24rpx 24rpx 0;
  border-radius: 24rpx;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 24rpx;
      height: 6rpx;
      margin: 0 6rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.25);
      transition: all 0.3s;
    }
    .active {
      width: 40rpx;
      background-color: #c9a96e;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
  .navigator {
    position: relative;
  }
  .image-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 60rpx 32rpx 48rpx;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    .stone-name {
      font-size: 32rpx;
      color: #ffffff;
      font-weight: 600;
      letter-spacing: 2rpx;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
