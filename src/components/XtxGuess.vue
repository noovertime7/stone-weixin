<script setup lang="ts">
import type { PageParams } from '@/types/global'
import { ref, onMounted } from 'vue'
import { pageStone } from '@/services/stone'
import type { Stone } from '@/types/stone'
import { isNewlyPublished } from '@/utils/utils'
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
  keyword: '',
}
const status = ref('more')
const guessList = ref<Stone[]>([])
const getHomeGoodsGuessLikeData = async () => {
  if (status.value != 'more') return
  status.value = 'loading'
  const res = await pageStone(pageParams)
  guessList.value.push(...res.data.list)
  if (pageParams.page < res.data.total && res.data.list.length > 0) {
    pageParams.page++
    status.value = 'more'
  } else {
    status.value = 'noMore'
  }
}

const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  status.value = 'more'
}
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <view class="caption">
    <view class="caption-line"></view>
    <text class="text">石材展厅</text>
    <view class="caption-line"></view>
  </view>
  <view class="gallery">
    <navigator
      class="gallery-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/stone/stone?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.coverImages[0]"></image>
      <view class="info">
        <view class="stone-name">{{ item.name }}</view>
        <view class="stone-desc">{{ item.description }}</view>
        <view class="tags">
          <text class="tag" v-if="isNewlyPublished(item.created_at)">新上架</text>
          <text class="tag hot" v-if="item.buyNum > 100">热门</text>
        </view>
      </view>
    </navigator>
  </view>
  <view class="load-more">
    <uni-load-more iconType="auto" :status="status" color="#c9a96e" />
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

.caption {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 48rpx 0 36rpx;
  gap: 24rpx;
  .caption-line {
    width: 80rpx;
    height: 1rpx;
    background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.5), transparent);
  }
  .text {
    font-size: 30rpx;
    color: #c9a96e;
    letter-spacing: 12rpx;
    font-weight: 500;
  }
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 24rpx;
  .gallery-item {
    width: 340rpx;
    margin-bottom: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background: #222222;
    border: 1rpx solid rgba(201, 169, 110, 0.08);
  }
  .image {
    width: 340rpx;
    height: 340rpx;
  }
  .info {
    padding: 20rpx 24rpx 24rpx;
  }
  .stone-name {
    font-size: 28rpx;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 2rpx;
    margin-bottom: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .stone-desc {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .tags {
    display: flex;
    gap: 12rpx;
    margin-top: 12rpx;
    .tag {
      padding: 4rpx 14rpx;
      font-size: 18rpx;
      color: #c9a96e;
      border: 1rpx solid rgba(201, 169, 110, 0.3);
      border-radius: 20rpx;
      letter-spacing: 2rpx;
    }
    .hot {
      color: #e8d5b7;
      border-color: rgba(232, 213, 183, 0.3);
    }
  }
}

.load-more {
  padding: 20rpx 0 40rpx;
}
</style>
