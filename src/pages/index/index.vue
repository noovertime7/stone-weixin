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
page {
  background-color: #f7f7f7;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
.back-top {
  height: 50px; /* 设置元素的高度 */
  width: 50px; /* 设置元素的宽度 */
  background-color: #f7f7f7; /* 设置元素的背景颜色 */
  border-radius: 50%; /* 将元素的边框设置为圆形 */
  position: fixed; /* 将元素固定在页面上 */
  bottom: 20px; /* 距离页面底部的距离 */
  right: 20px; /* 距离页面右侧的距离 */
  text-align: center; /* 文字居中 */
  line-height: 50px; /* 行高与元素高度相同，以垂直居中文本 */
  cursor: pointer; /* 鼠标悬停时显示指示光标 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}
.back-top:hover {
  background-color: #ccc; /* 悬停时的背景颜色 */
}
</style>
