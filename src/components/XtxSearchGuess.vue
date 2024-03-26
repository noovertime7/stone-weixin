<script setup lang="ts">
import type { PageParams } from '@/types/global'
import { ref, onMounted } from 'vue'
import { pageStone } from '@/services/stone'
import type { Stone } from '@/types/stone'
import { isNewlyPublished } from '@/utils/utils'
// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
  keyword: '',
}
const status = ref('more')
// 猜你喜欢的列表
const guessList = ref<Stone[]>([])
// 获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  if (status.value != 'more') return

  status.value = 'loading'

  const res = await pageStone(pageParams)
  // 数组追加
  guessList.value.push(...res.data.list)

  // 分页条件
  if (pageParams.page < res.data.total && res.data.list.length > 0) {
    // 页码累加
    pageParams.page++
    status.value = 'more'
  } else {
    status.value = 'noMore'
  }
}

// 重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  status.value = 'more'
}
// 组件挂载完毕
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">大家都在搜</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/stone/stone?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.coverImages[0]"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="badge">
        <uni-badge
          v-if="isNewlyPublished(item.created_at)"
          class="uni-badge-left-margin"
          text="新发布"
          type="primary"
        />
        <uni-badge v-if="item.buyNum > 100" class="uni-badge-left-margin" text="热门" />
      </view>
      <view class="description">{{ item.description }}</view>
      <!-- <view class="price">
        <text class="small text-ellipsis"></text>
        <text>{{ 100 }}</text>
      </view> -->
    </navigator>
  </view>
  <view>
    <!-- <uni-section title="基本用法" type="line"> -->
    <uni-load-more iconType="auto" :status="status" />
    <!-- </uni-section> -->
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .badge {
    display: flex; /* 将其设置为弹性盒子以水平排列内部元素 */
    justify-content: flex-start; /* 水平方向从左对齐 */
    align-items: center; /* 垂直方向居中对齐 */
    margin-top: 10rpx; /* 调整与上方元素的间距 */
    .uni-badge-left-margin {
      margin-right: 1cap; /* 调整徽章之间的间距 */
    }
  }
  .name {
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .description {
    margin-top: 5rpx; /* 调整 xxx 和 name 之间的间距 */
    font-size: 24rpx; /* 适当调整 description 的字体大小 */
    color: #888; /* 适当调整 description 的颜色 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
