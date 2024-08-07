<template>
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper @change="onChange" circular>
          <swiper-item v-for="item in StoneData?.coverImages" :key="item">
            <image class="image" @tap="onTapImage(item)" mode="aspectFill" :src="item" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ currentIndex + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ StoneData?.coverImages.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <!-- <view class="price">
          <text class="symbol">¥</text>
          <text class="number">29.90</text>
        </view> -->
        <view class="name ellipsis" style="display: flex; align-items: center"
          >{{ StoneData?.name }}
          <view class="m-2" v-if="member.profile">
            <button class="m-2" size="mini" plain type="primary" @click="editStone">编辑</button>
            <button class="m-2" size="mini" plain type="warn" @click="handleDelete">删除</button>
          </view>
        </view>

        <view class="desc"> {{ StoneData?.description }} </view>
      </view>

      <!-- 操作面板 -->
      <!-- <view class="action">
        <view class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis"> 请选择商品规格 </text>
        </view>
        <view class="item arrow">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址 </text>
        </view>
        <view class="item arrow">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view> -->
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <view class="item">
            <text class="label">已完成施工</text>
            <text class="value">{{ StoneData?.buyNum }}次</text>
          </view>
        </view>

        <!-- 图片详情 -->
        <view v-for="(item, index) in StoneData?.detailImages" :key="index">
          <image mode="widthFix" :src="item" @tap="openDetailImage(item)"></image
        ></view>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in SameStones"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/stone/stone?id=${item.id}`"
        >
          <image class="image" mode="aspectFill" :src="item.coverImages[0]"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <!-- <view class="price">
            <text class="symbol">¥</text>
            <text class="number">18.50</text>
          </view> -->
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="buttons">
      <view class="icons">
        <button class="icons-button" open-type="share">
          <view>
            <i class="t-icon t-icon-weixinhaoyou"></i>
          </view>
          微信
        </button>
        <navigator
          class="icons-button"
          :url="`/pages/search_result/search_result?keyword=${StoneData?.name}&current=1`"
          open-type="navigate"
        >
          <view>
            <i class="t-icon t-icon-dalishi"></i>
          </view>
          安装记录
        </navigator>
      </view>

      <view class="addcart" @tap="copyWeixinNum"> 微信联系 </view>
      <view class="buynow" @tap="makeCall"> 电话联系 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { deleteStoneById, getSameStones, getStoneById } from '@/services/stone'
import type { Stone } from '@/types/stone'
import { copyWeixinNum, makeCall } from '@/utils/utils'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import mixShare from '@/utils/share'

let pages = getCurrentPages() //获取当前页面栈的信息
let currentPage = pages[pages.length - 1] //获取到当前页面栈中最后一个页面的索引
const { share } = mixShare

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const member = useMemberStore()
// 接收页面参数
const query = defineProps<{
  id: string
}>()
const StoneData = ref<Stone>()
const SameStones = ref<Stone[]>([])
const getStoneData = async () => {
  if (query.id) {
    const res = await getStoneById(query.id)
    StoneData.value = res.data
  }
}
const getSameStonesData = async () => {
  if (query.id) {
    const res = await getSameStones(query.id)
    SameStones.value = res.data
  }
}

const handleDelete = async () => {
  uni.showModal({
    title: '提示',
    content: '您确定要删除此条数据吗？',
    showCancel: true,
    cancelText: '取消', // 取消按钮的文字
    confirmText: '确认', // 确认按钮的文字
    confirmColor: '#f55850',
    cancelColor: '#39B54A',
    success: async (res) => {
      if (res.confirm) {
        const res = await deleteStoneById(StoneData.value!.id)
        if (res) {
          uni.showToast({
            title: '删除成功!',
            icon: 'success',
          })
          uni.navigateBack({
            delta: 1,
          })
        }
      }
    },
  })
}

onLoad(async () => {
  await getStoneData()
  await getSameStonesData()

  share.desc = `${StoneData.value?.description}`
  share.path = `${currentPage.route}?id=${query.id}`
  share.title = `${StoneData.value?.name}`
})

// 轮播图变化时
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current
}

// 点击图片时
const onTapImage = (url: string) => {
  // 大图预览
  uni.previewImage({
    current: url,
    urls: StoneData.value!.coverImages,
  })
}

const openDetailImage = (url: string) => {
  // 大图预览
  uni.previewImage({
    current: url,
    urls: StoneData.value!.detailImages,
  })
}

const editStone = () => {
  uni.navigateTo({
    url: '/pages/stone_manage/stone_manage?id=' + StoneData.value?.id,
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    .image {
      width: 100%;
    }
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }
    .image {
      width: 300rpx;
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
