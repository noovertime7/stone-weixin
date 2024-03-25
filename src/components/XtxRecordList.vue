<template>
  <view class="scroll-row-item course course-one" @click="openDetail">
    <view class="position-relative">
      <image :src="record.images[0]"></image>
      <view class="text-white font-sm">{{ record.stoneName }}</view>
    </view>
    <view class="flex flex-column flex-shrink">
      <view class="flex align-center">
        <uni-icons type="calendar" size="15"></uni-icons>
        <text class="text-ellipsis font-sm"> {{ formatYearMonth(record.created_at) }}</text>
      </view>
      <text class="description">{{ record.description }}</text>
      <view class="flex align-center mt-1 text-light-muted">
        <uni-icons type="location" size="20" color="#A9A5A0"></uni-icons>
        <text class="text-ellipsis font-sm"> {{ record.location }}</text>
      </view>
      <view class="flex flex-1 align-end">
        <uni-tag text="视频" inverted type="primary" circle v-if="record.video" size="mini" />
        <uni-tag
          text="图片"
          inverted
          type="success"
          circle
          v-if="record.images"
          size="mini"
          style="margin: 0 0.5rem"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Record } from '../types/record_d'
import { formatYearMonth } from '@/utils/format.js'
// const openDetail = () => {
//   let params = `id=${item.id}`;

//   if (item.group_id) {
//     params += `&group_id=${item.group_id}`;
//   }
//   if (item.flashsale_id) {
//     params += `&flashsale_id=${item.flashsale_id}`;
//   }

//   let url = '/pages/course/course?' + params;
//   if (!item.type || item.type == 'column') {
//     url = '/pages/column/column?' + params;
//   }
//   if (item.type == 'live') {
//     url = '/pages/live/live?' + params;
//   }

//   uni.navigateTo({ url });
// };

const openDetail = () => {}

const props = defineProps<{
  record: Record
  tag: string
}>()

const tag = ref(props.tag)
</script>

<style scoped>
.course-two {
  width: 340rpx;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
}
.course-two > view:last-child > text:first-child {
  margin-top: 10rpx;
}
.course-two image,
.course-two > view:first-child {
  width: 340rpx;
  height: 180rpx;
}
.course > view:first-child > view {
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 10rpx;
}
.course-one {
  display: flex !important;
  padding: 20rpx;
}
.course-one > view:first-child {
  margin-right: 20rpx;
}
.course-one image,
.course-one > view:first-child {
  width: 300rpx;
  height: 180rpx;
  flex-shrink: 1;
}
.course-one > view:last-child {
  width: 400rpx;
}

.description {
  margin-top: 5rpx; /* 调整 xxx 和 name 之间的间距 */
  font-size: 24rpx; /* 适当调整 description 的字体大小 */
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
