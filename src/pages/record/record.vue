<template>
  <view class="navbar">
    <view @click="onSearch">
      <uni-search-bar placeholder="搜索您小区的安装" bgColor="#EEEEEE" readonly />
    </view>

    <view class="flex flex-column" style="height: 100%" v-if="Data">
      <view :duration="200" class="flex-1 flex flex-column">
        <view class="flex">
          <scroll-view class="flex-1" scroll-y @scrolltolower="handleLoadMore()">
            <XtxRecordList
              @tap="pushRecordDetail(item.id)"
              tag="one"
              :record="item"
              v-for="(item, index) in Data"
              :key="index"
            ></XtxRecordList>
          </scroll-view>
        </view>
        <uni-load-more iconType="auto" :status="status" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { pageRecord } from '../../services/record'
import type { PageParams } from '@/types/global'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Record } from '../../types/record_d'
import type XtxRecordList from '@/components/XtxRecordList.vue'
const handleLoadMore = () => {}
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
const getPageData = async () => {
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

const pushRecordDetail = (id: number) => {}

onLoad(() => {
  getPageData()
})
</script>
<style scoped lang="scss"></style>
