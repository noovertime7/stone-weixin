<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="fixed-top bg-white">
      <view style="height: 20px"></view>
      <view class="flex align-center" style="height: 44px; padding: 0 10px">
        <uni-easyinput
          class="flex-1"
          style="padding-right: 10px"
          suffixIcon="search"
          v-model="data"
          placeholder="请输入关键字后点击搜索图标搜索"
          @iconClick="$emit('confirm', data)"
        ></uni-easyinput>
      </view>
    </view>
    <view style="height: 64px"></view>
  </view>
</template>

<script>
export default {
  name: 'search-bar',
  props: {
    inputData: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      safeAreaInsets: uni.getSystemInfoSync(),
      data: this.inputData,
    }
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>

<style></style>
