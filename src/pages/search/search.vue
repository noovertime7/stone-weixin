<template>
  <scroll-view class="navbar" scroll-y enable-back-to-top @scrolltolower="onScrolltolower">
    <SearchBar :inputData="keyword" @confirm="handleSearchEvent"></SearchBar>

    <view v-if="list.length">
      <view class="flex align-center justify-between py-3 px-2">
        <text class="section-title">历史记录</text>
        <text class="clear-btn" @click="clear">清除全部</text>
      </view>

      <view class="flex flex-wrap px-2" style="margin-right: -30rpx">
        <text
          @click="handleSearchEvent(item)"
          class="history-tag"
          v-for="(item, index) in list"
          :key="index"
          >{{ item }}</text
        >
      </view>
    </view>
    <view>
      <XtxSearchGuess ref="guessRef"></XtxSearchGuess>
    </view>
    <XtxContactFloat />
  </scroll-view>
</template>

<script lang="ts" setup>
import SearchBar from '@/components/XtxSearchBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import XtxSearchGuess from '@/components/XtxSearchGuess.vue'
import XtxContactFloat from '@/components/XtxContactFloat.vue'

const guessRef = ref()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

const list = ref<string[]>([])

const query = defineProps<{
  keyword: string
}>()

const keyword = ref(query.keyword)

const handleSearchEvent = (value: string = '') => {
  if (value) {
    keyword.value = value
  }
  if (keyword.value == '') {
    return uni.showToast({ icon: 'none', title: '请输入关键词' })
  }
  addHistory()
  uni.navigateTo({
    url: `/pages/search_result/search_result?keyword=${keyword.value}&current=0`,
  })
}

const addHistory = () => {
  let index = list.value.findIndex((v) => v == keyword.value)
  if (index != -1) {
    objToFirst(list.value, index)
  } else {
    list.value.unshift(keyword.value)
  }
  uni.setStorageSync('historyKeyword', JSON.stringify(list.value))
}

const objToFirst = (arr: string[], index: number) => {
  if (index != 0) {
    arr.unshift(arr.splice(index, 1)[0])
  }
  return arr
}

const clear = () => {
  uni.showModal({
    content: '是否要清除搜索记录？',
    confirmColor: '#c9a96e',
    success: (res) => {
      if (res.confirm) {
        list.value = []
        uni.removeStorageSync('historyKeyword')
      }
    },
  })
}
onLoad(() => {
  let l = uni.getStorageSync('historyKeyword')
  if (l) {
    list.value = JSON.parse(l)
  }
})
</script>

<style scoped>
.navbar {
  height: 100vh;
  background: #1a1a1a;
}

.section-title {
  font-size: 30rpx;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 2rpx;
}

.clear-btn {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}

.history-tag {
  display: inline-block;
  padding: 12rpx 24rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(201, 169, 110, 0.12);
  border-radius: 32rpx;
  max-width: 300rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
