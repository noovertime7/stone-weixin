<template>
  <view class="viewport">
    <!-- 搜索框 -->
    <view class="search" @click="onSearch">
      <view class="input">
        <uni-icons type="search" size="18" color="rgba(255,255,255,0.4)"></uni-icons>
        <text class="placeholder">搜索大理石或安装记录</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in stoneTypeListData"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="
            () => {
              activeIndex = index
              handelClickType(item.id)
            }
          "
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <XtxSwiper class="banner" :list="bannerList" />
        <view class="panel">
          <view class="section">
            <navigator
              v-for="stone in Stones"
              :key="stone.id"
              class="goods"
              hover-class="none"
              :url="`/pages/stone/stone?id=${stone.id}`"
            >
              <image class="image" :src="stone.coverImages[0]"></image>
              <view class="name ellipsis">{{ stone.name }}</view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
    <XtxContactFloat />
  </view>
</template>
<script setup lang="ts">
import { getHotStones, getStonesByTypeId } from '@/services/stone'
import { stoneTypeList } from '@/services/stone_types'
import type { Stone } from '@/types/stone'
import type { StoneType } from '@/types/stone_types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import XtxContactFloat from '@/components/XtxContactFloat.vue'
const activeIndex = ref(0)
const bannerList = ref<Stone[]>([])
const stoneTypeListData = ref<StoneType[]>([])
const Stones = ref<Stone[]>([])

const getHotBannerStones = async () => {
  const res = await getHotStones()
  bannerList.value = res.data
}

const getstoneTypes = async () => {
  const res = await stoneTypeList()
  stoneTypeListData.value = res.data
  handelClickType(stoneTypeListData.value[activeIndex.value].id)
}

const handelClickType = async (id: number) => {
  const res = await getStonesByTypeId(id)
  Stones.value = res.data
}

const onSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}

onLoad(() => {
  getHotBannerStones()
  getstoneTypes()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #1a1a1a;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 16rpx 24rpx 20rpx;
  background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
  .input {
    display: flex;
    align-items: center;
    gap: 12rpx;
    height: 72rpx;
    padding-left: 28rpx;
    border-radius: 36rpx;
    background: rgba(255, 255, 255, 0.06);
    border: 1rpx solid rgba(201, 169, 110, 0.12);
    .placeholder {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.35);
    }
  }
}
/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background: #0d0d0d;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 32rpx;
      bottom: 0;
      width: 80rpx;
      border-top: 1rpx solid rgba(255, 255, 255, 0.06);
    }
  }
  .active {
    background: #1a1a1a;
    color: #c9a96e;
    font-weight: 600;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20rpx;
      width: 6rpx;
      height: 60rpx;
      border-radius: 0 6rpx 6rpx 0;
      background: linear-gradient(180deg, #c9a96e, #d4af37);
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}
/* 二级分类 */
.secondary {
  background: #1a1a1a;
  .banner {
    margin: 24rpx 24rpx 0;
    border-radius: 16rpx;
    overflow: hidden;
  }
  .panel {
    margin: 0 24rpx;
  }
  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 24rpx 24rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 12rpx;
      }
      .name {
        padding: 8rpx 2rpx;
        font-size: 22rpx;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
      }
    }
  }
}
</style>
