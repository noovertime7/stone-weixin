<template>
  <view class="scroll-row-item course course-one" @click="openDetail">
    <view class="position-relative">
      <image :src="stone.coverImages[0]"></image>
      <view class="text-white font-sm">热门</view>
    </view>
    <view class="flex flex-column flex-shrink">
      <text class="text-ellipsis font-md">{{ stone.name }}</text>
      <text class="text-ellipsis font-sm">{{ stone.description }}</text>
      <view class="flex flex-1 align-end">
        <slot>
          <uni-badge
            v-if="isNewlyPublished(stone.created_at)"
            class="uni-badge-left-margin"
            text="新发布"
            type="primary"
          />
          <uni-badge v-if="stone.buyNum > 100" class="uni-badge-left-margin" text="热门" />
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Stone } from '../types/stone'
import { isNewlyPublished } from '@/utils/utils'

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
  stone: Stone
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
  height: 170rpx;
  flex-shrink: 1;
}
.course-one > view:last-child {
  width: 400rpx;
}
</style>
