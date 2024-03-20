<template>
  <template>
    <!-- 自定义导航栏 -->
    <CustomNavbar />
    <uni-notice-bar
      show-icon
      text="骏腾石材：联系电话：18605486770"
      color="#2979FF"
      background-color="#EAF2FF"
      show-get-more
      more-text="马上联系"
      @getmore="makeCall"
    />
    <!-- 滚动容器 -->
    <scroll-view
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower"
      class="scroll-view"
      scroll-y
    >
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </scroll-view>
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import { getHotStones } from '@/services/stone'
import type { Stone } from '@/types/stone'
import { onLoad } from '@dcloudio/uni-app'
import { makeCall } from '@/utils/utils'
const bannerList = ref<Stone[]>([])

const getHotBannerStones = async () => {
  const res = await getHotStones()
  bannerList.value = res.data
}

// 当前下拉刷新状态
const isTriggered = ref(false)
const guessRef = ref()
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 加载数据
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([
    // getHomeBannerData(),
    // getHomeCategoryData(),
    // getHomeHotData(),
    getHotBannerStones(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}

const onScrolltolower = () => {
  guessRef.value?.getMore()
}

onLoad(() => {
  getHotBannerStones()
})
</script>

<style lang="scss">
//
</style>
