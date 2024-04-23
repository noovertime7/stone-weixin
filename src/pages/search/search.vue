<template>
  <scroll-view class="navbar" scroll-y enable-back-to-top @scrolltolower="onScrolltolower">
    <SearchBar :inputData="keyword" @confirm="handleSearchEvent"></SearchBar>

    <view v-if="list.length">
      <view class="flex align-center justify-between py-3 px-2">
        <text class="font-md font-weight-bold">历史记录</text>
        <text class="font-sm text-light-muted" @click="clear">清除全部</text>
      </view>

      <view class="flex flex-wrap px-2" style="margin-right: -30rpx">
        <text
          @click="handleSearchEvent(item)"
          class="bg-hover-light px-2 py-1 font-sm rounded-circle"
          v-for="(item, index) in list"
          :key="index"
          style="
            margin-right: 25rpx;
            margin-bottom: 25rpx;
            line-height: 1;
            max-width: 300rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          "
          >{{ item }}</text
        >
        <!-- <uni-badge :text="item" size="normal" v-for="(item,index) in list" :key="index" style="margin-right: 25rpx;margin-bottom: 25rpx;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width: 200rpx;" @click="handleSearchEvent(item)"></uni-badge> -->
      </view>
    </view>
    <view>
      <XtxSearchGuess ref="guessRef"></XtxSearchGuess>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import SearchBar from '@/components/XtxSearchBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import XtxSearchGuess from '@/components/XtxSearchGuess.vue'

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
  // 跳转到搜索结果页

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
}
</style>
