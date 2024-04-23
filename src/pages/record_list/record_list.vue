<template>
  <view class="navbar">
    <view @click="onSearch">
      <uni-search-bar placeholder="搜索您小区的安装" bgColor="#EEEEEE" readonly />
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
        <uni-load-more iconType="snow" :status="status" />
      </scroll-view>
    </view>
    <view v-else> <Skeleton></Skeleton> </view>
  </view>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'
import { pageRecord } from '@/services/record'
import type { PageParams } from '@/types/global'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Record } from '@/types/record_d'
import type XtxRecordList from '@/components/XtxRecordList.vue'
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
  // 开始动画
  isTriggered.value = true

  await Promise.all([
    // getHomeBannerData(),
    // getHomeCategoryData(),
    // getHomeHotData(),
    getPageData(),
  ])
  // 关闭动画
  isTriggered.value = false
}

const getPageData = async () => {
  console.log(status.value)

  if (status.value != 'more') return

  status.value = 'loading'

  const res = await pageRecord(pageParams)
  // 数组追加
  Data.value.push(...res.data.list)

  // 分页条件
  if (pageParams.page < res.data.total && res.data.list.length > 0) {
    // 页码累加
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
  background-color: #f7f7f7;
  height: 95vh;
  display: flex;
  flex-direction: column;
}
</style>
