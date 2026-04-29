<template>
  <scroll-view scroll-y class="viewport">
    <!-- 视频 -->
    <view class="goods">
      <XtxVideo :url="RecordData?.video" v-show="RecordData?.video"></XtxVideo>

      <!-- 简介 -->
      <view class="meta">
        <view class="name">{{ RecordData?.stoneName }}</view>
        <view class="desc">{{ RecordData?.description }}</view>
        <view class="admin-actions" v-if="member.profile">
          <button class="btn-edit" size="mini" @click="editRecord">编辑</button>
          <button class="btn-delete" size="mini" @click="handleDelete">删除</button>
        </view>
      </view>
    </view>

    <!-- 详情 -->
    <view class="detail panel">
      <view class="title">
        <view class="title-bar"></view>
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <view class="item" v-if="RecordData?.date">
            <text class="label">安装时间</text>
            <text class="value">{{ RecordData?.date }}</text>
          </view>
          <view class="item" v-if="RecordData?.location">
            <text class="label">地址</text>
            <text class="value">{{ RecordData?.location }}</text>
          </view>
          <view class="item" v-if="RecordData?.detailedlocation">
            <text class="label">详细地址</text>
            <text class="value">{{ RecordData?.detailedlocation }}</text>
          </view>
          <view class="item">
            <text class="label">浏览量</text>
            <text class="value">{{ RecordData?.viewCount || 0 }}次</text>
          </view>
        </view>
        <view v-if="RecordData?.latitude && RecordData?.longitude">
          <XtxMap :latitude="RecordData?.latitude" :longitude="RecordData?.longitude" />
        </view>

        <view class="section-title">
          <view class="title-bar"></view>
          <text>安装展示</text>
          <text class="image-count">{{ RecordData?.images?.length }}张</text>
        </view>
        <!-- 首图大图 -->
        <view v-if="RecordData?.images?.length" class="hero-image" @tap="openDetailImage(RecordData.images[0])">
          <image mode="aspectFill" :src="RecordData.images[0]"></image>
        </view>
        <!-- 剩余图片双列网格 -->
        <view v-if="RecordData?.images?.length > 1" class="image-grid">
          <view
            v-for="(item, index) in RecordData?.images?.slice(1)"
            :key="index"
            class="grid-item"
            @tap="openDetailImage(item)"
          >
            <image mode="aspectFill" :src="item"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <view class="title-bar"></view>
        <text>同类推荐</text>
      </view>
      <scroll-view scroll-x class="similar-scroll">
        <view class="similar-list">
          <navigator
            v-for="item in SameStones"
            :key="item.id"
            class="goods"
            hover-class="none"
            :url="`/pages/stone/stone?id=${item.id}`"
          >
            <image class="image" mode="aspectFill" :src="item.coverImages[0]"></image>
            <view class="name ellipsis">{{ item.name }}</view>
          </navigator>
        </view>
      </scroll-view>
    </view>

    <view style="height: 180rpx;"></view>
  </scroll-view>

  <XtxContactFloat />

  <!-- 底部操作栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="buttons">
      <view class="icons">
        <button class="icons-button" open-type="share">
          <uni-icons type="redo" size="22" color="#c9a96e"></uni-icons>
          <text>分享</text>
        </button>
        <navigator
          class="icons-button"
          :url="`/pages/stone/stone?id=${RecordData?.stoneId}`"
          open-type="navigate"
        >
          <uni-icons type="image" size="22" color="#c9a96e"></uni-icons>
          <text>大理石</text>
        </navigator>
      </view>
      <view class="addcart" @tap="copyWeixinNum"> 微信联系 </view>
      <view class="buynow" @tap="makeCall"> 电话联系 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { deleteRecordById, getRecordById } from '@/services/record'
import XtxVideo from '@/components/XtxVideo.vue'
import XtxMap from '@/components/XtxMap.vue'
import type { Record } from '@/types/record_d'
import { copyWeixinNum, makeCall } from '@/utils/utils'
import XtxContactFloat from '@/components/XtxContactFloat.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import type { Stone } from '../../types/stone'
import { getSameStones } from '../../services/stone'
import mixShare from '@/utils/share'

let pages = getCurrentPages()
let currentPage = pages[pages.length - 1]
const { share } = mixShare

const SameStones = ref<Stone[]>([])
const getSameStonesData = async () => {
  if (RecordData.value?.stoneId) {
    const res = await getSameStones(RecordData.value?.stoneId)
    SameStones.value = res.data
  }
}
const member = useMemberStore()
const query = defineProps<{
  id: string
}>()
const RecordData = ref<Record>()
const { safeAreaInsets } = uni.getSystemInfoSync()

const getRecordData = async () => {
  if (query.id) {
    const res = await getRecordById(query.id)
    RecordData.value = res.data
  }
}

const handleDelete = async () => {
  uni.showModal({
    title: '提示',
    content: '您确定要删除此条数据吗？',
    showCancel: true,
    confirmText: '确认',
    confirmColor: '#c9a96e',
    cancelColor: '#666',
    success: async (res) => {
      if (res.confirm) {
        const res = await deleteRecordById(RecordData.value!.id)
        if (res) {
          uni.showToast({ title: '删除成功!', icon: 'success' })
          uni.navigateBack({ delta: 1 })
        }
      }
    },
  })
}

onLoad(async () => {
  await getRecordData()
  await getSameStonesData()
  share.desc = `${RecordData.value?.description}`
  share.path = `${currentPage.route}?id=${query.id}`
  share.title = `[${RecordData.value?.location}]${RecordData.value?.stoneName}${RecordData.value?.date}安装记录`
})

const openDetailImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: RecordData.value!.images,
  })
}

const editRecord = () => {
  uni.navigateTo({
    url: '/pages/record_manage/record_manage?id=' + RecordData.value?.id,
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
}

.viewport {
  background-color: #1a1a1a;
}

.panel {
  margin-top: 24rpx;
  background: #222222;
  margin-left: 24rpx;
  margin-right: 24rpx;
  border-radius: 20rpx;
  padding: 24rpx;
  border: 1rpx solid rgba(201, 169, 110, 0.08);
  .title,
  .section-title {
    display: flex;
    align-items: center;
    height: 60rpx;
    margin-bottom: 20rpx;
    gap: 16rpx;
    .title-bar {
      width: 6rpx;
      height: 32rpx;
      border-radius: 3rpx;
      background: linear-gradient(180deg, #c9a96e, #d4af37);
    }
    text {
      font-size: 30rpx;
      color: #ffffff;
      font-weight: 600;
      letter-spacing: 2rpx;
    }
  }
  .section-title {
    margin-top: 32rpx;
    .image-count {
      margin-left: auto;
      font-size: 22rpx;
      color: rgba(255, 255, 255, 0.35);
      font-weight: 400;
      letter-spacing: 0;
    }
  }
}

.goods {
  background: #1a1a1a;
  .preview {
    height: 420rpx;
    width: 100%;
  }
  .meta {
    padding: 28rpx 32rpx 32rpx;
    .name {
      font-size: 36rpx;
      color: #ffffff;
      font-weight: 600;
      letter-spacing: 2rpx;
      line-height: 1.4;
    }
    .desc {
      margin-top: 12rpx;
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.6;
    }
    .admin-actions {
      display: flex;
      gap: 16rpx;
      margin-top: 24rpx;
      button {
        border-radius: 40rpx;
        font-size: 24rpx;
        border: none;
      }
      .btn-edit {
        background: rgba(201, 169, 110, 0.15);
        color: #c9a96e;
      }
      .btn-delete {
        background: rgba(255, 77, 77, 0.15);
        color: #ff4d4f;
      }
    }
  }
}

.detail {
  .content {
    .image { width: 100%; border-radius: 12rpx; }
  }
  .properties {
    margin-bottom: 24rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 12rpx 0;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
      border-bottom: 1rpx solid rgba(201, 169, 110, 0.08);
    }
    .label { width: 200rpx; color: rgba(255, 255, 255, 0.45); }
    .value { flex: 1; color: #c9a96e; font-weight: 500; }
  }
  .hero-image {
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 16rpx;
    image {
      width: 100%;
      height: 480rpx;
    }
  }
  .image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
    .grid-item {
      width: calc(50% - 6rpx);
      border-radius: 12rpx;
      overflow: hidden;
      image {
        width: 100%;
        height: 300rpx;
      }
    }
  }
}

.similar {
  .similar-scroll { white-space: nowrap; }
  .similar-list {
    display: inline-flex;
    gap: 20rpx;
    padding-bottom: 8rpx;
  }
  .goods {
    width: 240rpx;
    flex-shrink: 0;
    background: #2a2a2a;
    border-radius: 16rpx;
    overflow: hidden;
    border: 1rpx solid rgba(201, 169, 110, 0.08);
  }
  .image { width: 240rpx; height: 200rpx; }
  .name {
    padding: 16rpx;
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(13, 13, 13, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  height: 100rpx;
  padding: 0 24rpx var(--window-bottom);
  border-top: 1rpx solid rgba(201, 169, 110, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    width: 100%;
    align-items: center;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 28rpx;
      color: #fff;
      border-radius: 36rpx;
      font-weight: 500;
      letter-spacing: 2rpx;
    }
    .addcart { background: linear-gradient(135deg, #07c160 0%, #06ae56 100%); }
    .buynow {
      background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
      margin-left: 16rpx;
    }
  }
  .icons {
    padding-right: 16rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.3;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: rgba(255, 255, 255, 0.6);
      background-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4rpx;
      &::after { border: none; }
    }
  }
}
</style>
