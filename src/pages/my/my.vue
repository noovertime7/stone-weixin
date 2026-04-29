<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { ref } from 'vue'
import XtxGuess from '@/components/XtxGuess.vue'
import XtxContactFloat from '@/components/XtxContactFloat.vue'
import { makeCall, copyWeixinNum } from '@/utils/utils'
const { safeAreaInsets } = uni.getSystemInfoSync()

const orderTypes = [
  {
    type: 1,
    text: '分类管理',
    icon: 'icon-currency',
    url: '/pages/stone_type_list/stone_type_list',
  },
  { type: 2, text: '添加大理石', icon: 'icon-gift', url: '/pages/stone_manage/stone_manage' },
  { type: 3, text: '打卡', icon: 'icon-check', url: '/pages/record_manage/record_manage' },
]

const memberStore = useMemberStore()
const guessRef = ref()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

const stats = [
  { num: '15+', label: '年从业经验' },
  { num: '2000+', label: '成功案例' },
  { num: '100%', label: '客户好评' },
  { num: '24h', label: '售后响应' },
]

const services = [
  { icon: '🏠', title: '别墅豪宅', desc: '高端别墅大理石整装设计与施工' },
  { icon: '🏢', title: '商业空间', desc: '酒店、会所、写字楼等商业项目' },
  { icon: '🪜', title: '楼梯台面', desc: '大理石楼梯、窗台、台面定制安装' },
  { icon: '🛁', title: '卫浴空间', desc: '大理石浴室墙面地面一体化施工' },
  { icon: '🏗️', title: '幕墙干挂', desc: '外墙大理石干挂幕墙工程' },
  { icon: '✨', title: '翻新养护', desc: '大理石抛光、晶面处理、裂缝修复' },
]

const advantages = [
  '精选全球优质石材矿源，源头直供',
  '自有加工车间，精准切割无缝拼接',
  '15年老师傅亲自带队施工',
  '全流程数字化管理，工期有保障',
  '完善的售后养护服务体系',
  '服务覆盖山东及周边省市',
]
</script>

<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top @scrolltolower="onScrolltolower">
    <!-- 头部区域 -->
    <view class="hero" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="hero-bg"></view>
      <view class="hero-content">
        <view class="logo-ring">
          <image class="avatar" src="http://qiniu.yunxue521.top/stone/WechatIMG155.jpeg" mode="aspectFill"></image>
        </view>
        <view class="brand">骏腾石材</view>
        <view class="slogan">Master Stone Craftsmanship</view>
        <view class="divider">
          <view class="divider-line"></view>
          <view class="divider-diamond"></view>
          <view class="divider-line"></view>
        </view>
        <view class="master-title">陈师傅 · 高级石材安装技师</view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-bar">
      <view class="stat-item" v-for="item in stats" :key="item.label">
        <view class="stat-num">{{ item.num }}</view>
        <view class="stat-label">{{ item.label }}</view>
      </view>
    </view>

    <!-- 个人简介 -->
    <view class="section-card">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">匠心简介</text>
      </view>
      <view class="bio-text">
        陈师傅，从事大理石安装与养护工作15余年，师从国内顶级石材工艺大师。精通各类天然大理石、人造石、岩板的安装施工，擅长异形切割、无缝拼接、水刀拼花等高难度工艺。服务过的项目涵盖高端别墅、星级酒店、商业综合体等多种场景，以精湛的工艺和严谨的态度赢得了广大客户的信赖与好评。
      </view>
      <view class="bio-text">
        始终秉持"精益求精，匠心独运"的理念，对每一块石材都倾注匠心，力求将天然石材的纹理之美完美呈现，为每一位客户打造独一无二的品质空间。
      </view>
    </view>

    <!-- 服务项目 -->
    <view class="section-card">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">服务项目</text>
      </view>
      <view class="service-grid">
        <view class="service-item" v-for="item in services" :key="item.title">
          <view class="service-icon">{{ item.icon }}</view>
          <view class="service-info">
            <view class="service-title">{{ item.title }}</view>
            <view class="service-desc">{{ item.desc }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 核心优势 -->
    <view class="section-card">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">核心优势</text>
      </view>
      <view class="advantage-list">
        <view class="advantage-item" v-for="(item, index) in advantages" :key="index">
          <view class="advantage-check">
            <uni-icons type="checkmarkempty" size="14" color="#c9a96e"></uni-icons>
          </view>
          <text class="advantage-text">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="section-card contact-card">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">联系我们</text>
      </view>
      <view class="contact-row" @tap="makeCall">
        <uni-icons type="phone" size="20" color="#c9a96e"></uni-icons>
        <text class="contact-label">电话咨询</text>
        <text class="contact-value">18605486770</text>
        <uni-icons type="right" size="16" color="rgba(255,255,255,0.3)"></uni-icons>
      </view>
      <view class="contact-row" @tap="copyWeixinNum">
        <uni-icons type="weixin" size="20" color="#07c160"></uni-icons>
        <text class="contact-label">微信咨询</text>
        <text class="contact-value">18605486770</text>
        <uni-icons type="right" size="16" color="rgba(255,255,255,0.3)"></uni-icons>
      </view>
    </view>

    <!-- 管理入口 -->
    <view class="section-card admin-card" v-if="memberStore.profile">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">管理后台</text>
      </view>
      <view class="admin-grid">
        <navigator
          v-for="item in orderTypes"
          :key="item.type"
          :url="`${item.url}?type=${item.type}`"
          class="admin-item"
          hover-class="none"
        >
          <view class="admin-icon-wrap">
            <uni-icons :type="item.type === 1 ? 'list' : item.type === 2 ? 'plus' : 'checkmarkempty'" size="22" color="#c9a96e"></uni-icons>
          </view>
          <text class="admin-text">{{ item.text }}</text>
        </navigator>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <view class="guess">
      <XtxGuess ref="guessRef" />
    </view>

    <view style="height: 180rpx;"></view>
  </scroll-view>
  <XtxContactFloat />
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #1a1a1a;
}

.viewport {
  height: 100%;
  background-color: #1a1a1a;
}

/* 头部英雄区 */
.hero {
  position: relative;
  padding-bottom: 48rpx;
  overflow: hidden;
  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 520rpx;
    background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
  }
  .hero-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 48rpx;
  }
  .logo-ring {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 3rpx solid #c9a96e;
    padding: 6rpx;
    box-shadow: 0 8rpx 40rpx rgba(201, 169, 110, 0.25), 0 0 60rpx rgba(201, 169, 110, 0.1);
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .brand {
    margin-top: 28rpx;
    font-size: 42rpx;
    color: #c9a96e;
    font-weight: 700;
    letter-spacing: 16rpx;
  }
  .slogan {
    margin-top: 8rpx;
    font-size: 20rpx;
    color: rgba(201, 169, 110, 0.5);
    letter-spacing: 6rpx;
    text-transform: uppercase;
  }
  .divider {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-top: 28rpx;
    .divider-line {
      width: 80rpx;
      height: 1rpx;
      background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.5));
    }
    .divider-diamond {
      width: 12rpx;
      height: 12rpx;
      background: #c9a96e;
      transform: rotate(45deg);
    }
  }
  .master-title {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 4rpx;
    font-weight: 500;
  }
}

/* 数据统计 */
.stats-bar {
  display: flex;
  margin: 0 24rpx;
  padding: 32rpx 0;
  background: #222222;
  border-radius: 20rpx;
  border: 1rpx solid rgba(201, 169, 110, 0.08);
  .stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
    border-right: 1rpx solid rgba(201, 169, 110, 0.08);
    &:last-child {
      border-right: none;
    }
  }
  .stat-num {
    font-size: 36rpx;
    color: #c9a96e;
    font-weight: 700;
    letter-spacing: 2rpx;
  }
  .stat-label {
    font-size: 20rpx;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 2rpx;
  }
}

/* 通用卡片 */
.section-card {
  margin: 24rpx 24rpx 0;
  padding: 32rpx;
  background: #222222;
  border-radius: 20rpx;
  border: 1rpx solid rgba(201, 169, 110, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 28rpx;
  .header-bar {
    width: 6rpx;
    height: 32rpx;
    border-radius: 3rpx;
    background: linear-gradient(180deg, #c9a96e, #d4af37);
  }
  .header-title {
    font-size: 30rpx;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 2rpx;
  }
}

/* 简介 */
.bio-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  text-indent: 2em;
  margin-bottom: 16rpx;
  &:last-child {
    margin-bottom: 0;
  }
}

/* 服务项目 */
.service-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  .service-item {
    width: calc(50% - 10rpx);
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 20rpx;
    background: rgba(201, 169, 110, 0.05);
    border-radius: 16rpx;
    border: 1rpx solid rgba(201, 169, 110, 0.08);
  }
  .service-icon {
    font-size: 36rpx;
    flex-shrink: 0;
  }
  .service-title {
    font-size: 26rpx;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 2rpx;
    margin-bottom: 4rpx;
  }
  .service-desc {
    font-size: 20rpx;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.4;
  }
}

/* 核心优势 */
.advantage-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  .advantage-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }
  .advantage-check {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    background: rgba(201, 169, 110, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .advantage-text {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
}

/* 联系方式 */
.contact-card {
  .contact-row {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(201, 169, 110, 0.08);
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    &:first-of-type {
      padding-top: 0;
    }
  }
  .contact-label {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    flex: 1;
  }
  .contact-value {
    font-size: 28rpx;
    color: #c9a96e;
    font-weight: 500;
    letter-spacing: 2rpx;
  }
}

/* 管理入口 */
.admin-card {
  .admin-grid {
    display: flex;
    justify-content: space-around;
    padding: 16rpx 0;
  }
  .admin-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
  }
  .admin-icon-wrap {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background: rgba(201, 169, 110, 0.1);
    border: 1rpx solid rgba(201, 169, 110, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .admin-text {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 2rpx;
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #1a1a1a;
  margin-top: 24rpx;
}
</style>
