<template>
  <template>
    <CustomNavbar />
    <uni-notice-bar
      show-icon
      text="骏腾石材：联系电话：陈18605486770"
      color="#c9a96e"
      background-color="rgba(201,169,110,0.08)"
      show-get-more
      more-text="马上联系"
      @getmore="makeCall"
      class="notice"
    />
    <scroll-view
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower"
      class="scroll-view"
      scroll-y
    >
      <Skeleton v-if="loading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <XtxGuess ref="guessRef" />
      </template>
    </scroll-view>
    <XtxContactFloat />
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxContactFloat from '@/components/XtxContactFloat.vue'
import { getHotStones } from '@/services/stone'
import type { Stone } from '@/types/stone'
import { onLoad } from '@dcloudio/uni-app'
import { makeCall } from '@/utils/utils'
import Skeleton from './components/Skeleton.vue'
const bannerList = ref<Stone[]>([])
const loading = ref(true)
const getHotBannerStones = async () => {
  const res = await getHotStones()
  bannerList.value = res.data
}

const isTriggered = ref(false)
const guessRef = ref()
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([
    getHotBannerStones(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}

const onScrolltolower = () => {
  guessRef.value?.getMore()
}

onLoad(() => {
  getHotBannerStones()
  loading.value = false
})
</script>

<style lang="scss">
page {
  background-color: #1a1a1a;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
.notice {
  border-bottom: 1rpx solid rgba(201, 169, 110, 0.1);
}
</style>
