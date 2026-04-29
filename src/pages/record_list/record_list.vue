<template>
  <view class="navbar">
    <view @click="onSearch">
      <view class="search-bar">
        <uni-icons type="search" size="18" color="rgba(255,255,255,0.4)"></uni-icons>
        <text class="placeholder">搜索您小区的安装</text>
      </view>
    </view>

    <view v-if="Data" class="scroll-view">
      <scroll-view
        enable-back-to-top
        refresher-enabled
        @refresherrefresh="onRefresherrefresh"
        :refresher-triggered="isTriggered"
        @scrolltolower="handleLoadMore"
        class="scroll"
        scroll-y
      >
        <XtxRecordList
          @tap="pushRecordDetail(item.id)"
          tag="one"
          :record="item"
          v-for="(item, index) in Data"
          :key="index"
        ></XtxRecordList>
        <uni-load-more iconType="snow" :status="status" color="#c9a96e" />
      </scroll-view>
    </view>
    <view v-else> <Skeleton></Skeleton> </view>
    <XtxContactFloat />
  </view>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'
import { pageRecord } from '@/services/record'
import type { PageParams } from '@/types/global'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Record } from '@/types/record_d'
import XtxContactFloat from '@/components/XtxContactFloat.vue'
const handleLoadMore = async () => {
  await getPageData()
}
const status = ref('more')
const Data = ref<Record[]>([])
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
  keyword: '',
}
const onSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  await Promise.all([getPageData()])
  isTriggered.value = false
}

const getPageData = async () => {
  if (status.value != 'more') return
  status.value = 'loading'
  const res = await pageRecord(pageParams)
  Data.value.push(...res.data.list)
  if (pageParams.page < res.data.total && res.data.list.length > 0) {
    pageParams.page++
    status.value = 'more'
  } else {
    status.value = 'noMore'
  }
}

const pushRecordDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/record/record?id=${id}`,
  })
}

onLoad(() => {
  getPageData()
})
</script>
<style scoped lang="scss">
.scroll {
  flex: 1;
}

.scroll-view {
  background-color: #1a1a1a;
  height: 95vh;
  display: flex;
  flex-direction: column;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12rpx;
  height: 72rpx;
  margin: 16rpx 24rpx;
  padding: 0 28rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(201, 169, 110, 0.12);
  .placeholder {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.35);
  }
}
</style>
