<template>
  <view class="record-card" @click="openDetail">
    <view class="card-image">
      <image :src="record.images[0]" mode="aspectFill"></image>
    </view>
    <view class="card-info">
      <view class="stone-name">{{ record.stoneName }}</view>
      <view class="info-row">
        <uni-icons type="calendar" size="14" color="#c9a96e"></uni-icons>
        <text class="date">{{ record.date }}</text>
      </view>
      <text class="description">{{ record.description }}</text>
      <view class="info-row" v-if="record.location">
        <uni-icons type="location" size="14" color="rgba(255,255,255,0.35)"></uni-icons>
        <text class="location">{{ record.location }}</text>
      </view>
      <view class="tags">
        <uni-tag text="视频" inverted type="primary" circle v-if="record.video" size="mini" />
        <uni-tag
          text="图片"
          inverted
          type="success"
          circle
          v-if="record.images"
          size="mini"
          style="margin-left: 12rpx"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Record } from '../types/record_d'

const openDetail = () => {}

const props = defineProps<{
  record: Record
  tag: string
}>()

const tag = ref(props.tag)
</script>

<style scoped>
.record-card {
  display: flex;
  padding: 24rpx;
  margin: 16rpx 24rpx;
  background: #222222;
  border-radius: 20rpx;
  border: 1rpx solid rgba(201, 169, 110, 0.08);
}

.card-image {
  position: relative;
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
  font-size: 28rpx;
  color: #c9a96e;
  font-weight: 600;
  letter-spacing: 2rpx;
  margin-bottom: 12rpx;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 8rpx;
}

.date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
}

.description {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.45);
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8rpx;
  line-height: 1.5;
}

.location {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.35);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.tags {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 8rpx;
}
</style>
