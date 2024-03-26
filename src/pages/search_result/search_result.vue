<template>
  <view class="navbar">
    <!-- <view>
      <SearchBar :inputData="query.keyword" @click="backSearch"></SearchBar>
    </view> -->
    <view>
      <view class="flex flex-column" style="height: 100%">
        <XtxTab :tabs="tabs" :current="current" @change="clickTab"></XtxTab>

        <view :duration="200" class="flex-1 flex flex-column" @change="swiperChange">
          <view class="flex">
            <scroll-view class="flex-1" scroll-y @scrolltolower="handleLoadMore(tabs[current])">
              <view v-for="(item, index) in tabs[current].list" :key="index">
                <!--           -->
                <XtxStonelist
                  v-if="tabs[current].type == 'stone'"
                  @tap="pushStoneDetail(item.id)"
                  tag="one"
                  :stone="item"
                ></XtxStonelist>

                <XtxRecordList
                  v-if="tabs[current].type == 'record'"
                  :record="item"
                  @tap="pushRecordDetail"
                >
                </XtxRecordList>
              </view>
            </scroll-view>
          </view>
          <view class="loading-text">
            {{ tabs[current].finish ? '没有更多数据~' : '正在加载...' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { PageParams } from '@/types/global'
import XtxTab from '@/components/XtxTab.vue'
import type { Stone } from '../../types/stone'
import { pageStone } from '@/services/stone'
import XtxStonelist from '@/components/XtxStonelist.vue'
import { pageRecord } from '../../services/record'
import type { Record } from '../../types/record_d'

// 接收页面参数
const query = defineProps<{
  keyword: string
}>()
const current = ref(0)
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
  keyword: query.keyword,
}

const pushStoneDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/stone/stone?id=${id}`,
  })
}

const pushRecordDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/record/record?id=${id}`,
  })
}

type TabItem = {
  name: string
  list: Stone[] | Record[]
  page: number
  pageSize: number
  type: 'stone' | 'record'
  finish: boolean
}

const tabs = ref<TabItem[]>([
  {
    name: '大理石',
    list: [],
    page: 1,
    pageSize: 10,
    type: 'stone',
    finish: false,
  },
  {
    name: '安装记录',
    list: [],
    page: 1,
    pageSize: 10,
    type: 'record',
    finish: false,
  },
])

const handleLoadMore = async (t: TabItem) => {
  if (t.finish) {
    return
  }
  t.page++
  await getData()
}

const clickTab = (index: number) => {
  swiperChange({
    detail: {
      current: index,
    },
  })
}

const swiperChange = (e: any) => {
  current.value = e.detail.current
  let tab = tabs.value[current.value]
  if (tab.page == 1) {
    getData()
  }
}
// 已结束标记
const getData = async () => {
  let tab = tabs.value[current.value]
  switch (tab.type) {
    case 'stone': {
      if (tab.finish === true) {
        return
      }
      let res = await pageStone(pageParams)
      // 分页条件
      if (res.data.total < pageParams.pageSize) {
        tab.finish = true
      }
      tab.list = tab.page == 1 ? res.data.list : [...tab.list, ...res.data.list]

      break
    }

    case 'record': {
      if (tab.finish === true) {
        return
      }
      let res = await pageRecord(pageParams)
      // 分页条件
      if (res.data.total < pageParams.pageSize) {
        tab.finish = true
      }
      tab.list = tab.page == 1 ? res.data.list : [...tab.list, ...res.data.list]

      break
    }
  }
}

onShow(() => {
  getData()
})
</script>

<style scoped>
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
