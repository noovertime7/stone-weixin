<template>
  <view class="stone-card" @click="openDetail">
    <view class="card-image">
      <image :src="stone.coverImages[0]" mode="aspectFill"></image>
    </view>
    <view class="card-info">
      <text class="stone-name">{{ stone.name }}</text>
      <text class="stone-desc">{{ stone.description }}</text>
      <view class="tags">
        <text class="tag" v-if="isNewlyPublished(stone.created_at)">新上架</text>
        <text class="tag hot" v-if="stone.buyNum > 100">热门</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Stone } from '../types/stone'
import { isNewlyPublished } from '@/utils/utils'

const openDetail = () => {}

const props = defineProps<{
  stone: Stone
  tag: string
}>()

const tag = ref(props.tag)
</script>

<style scoped>
.stone-card {
  display: flex;
  padding: 24rpx;
  margin: 16rpx 24rpx;
  background: #222222;
  border-radius: 20rpx;
  border: 1rpx solid rgba(201, 169, 110, 0.08);
}

.card-image {
  width: 260rpx;
  height: 200rpx;
  flex-shrink: 0;
  margin-right: 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.card-image image {
  width: 100%;
  height: 100%;
}

.card-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.stone-name {
  font-size: 30rpx;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stone-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.45);
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 12rpx;
  margin-top: auto;
  padding-top: 12rpx;
}

.tag {
  padding: 4rpx 16rpx;
  font-size: 20rpx;
  color: #c9a96e;
  border: 1rpx solid rgba(201, 169, 110, 0.3);
  border-radius: 20rpx;
  letter-spacing: 2rpx;
}

.hot {
  color: #e8d5b7;
  border-color: rgba(232, 213, 183, 0.3);
}
</style>
