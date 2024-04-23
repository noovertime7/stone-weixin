<template name="skeleton">
  <view class="sk-container">
    <scroll-view enable-back-to-top refresher-enabled scroll-y class="scroll-view scroll-view">
      <view is="components/XtxSwiper">
        <view class="carousel XtxSwiper--carousel">
          <swiper :autoplay="false" :circular="true" :interval="3000" :current="0"></swiper>
          <view class="indicator XtxSwiper--indicator">
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot"></text>
            <text class="dot XtxSwiper--dot"></text>
          </view>
        </view>
      </view>
      <view is="components/XtxGuess" class="r r">
        <view class="caption XtxGuess--caption">
          <text
            class="text XtxGuess--text sk-transparent sk-text-22-2222-500 sk-text sk-pseudo sk-pseudo-circle"
            >为您推荐</text
          >
        </view>
        <view class="guess XtxGuess--guess">
          <navigator class="guess-item XtxGuess--guess-item">
            <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
            <view class="name XtxGuess--name sk-transparent sk-text-14-2857-384 sk-text"
              >白色大理石</view
            >
            <view class="badge XtxGuess--badge">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge"
                class="uni-badge-left-margin XtxGuess--uni-badge-left-margin"
              >
                <view class="uni-badge--x badge--uni-badge--x">
                  <text
                    class="uni-badge--primary badge--uni-badge--primary uni-badge--small badge--uni-badge--small uni-badge badge--uni-badge sk-transparent sk-text-16-6667-819 sk-text"
                    style="background-position-x: 50%"
                    >新发布</text
                  >
                </view>
              </view>
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge"
                class="uni-badge-left-margin XtxGuess--uni-badge-left-margin"
              >
                <view class="uni-badge--x badge--uni-badge--x">
                  <text
                    class="uni-badge--error badge--uni-badge--error uni-badge--small badge--uni-badge--small uni-badge badge--uni-badge sk-transparent sk-text-16-6667-310 sk-text"
                    style="background-position-x: 50%"
                    >热门</text
                  >
                </view>
              </view>
            </view>
            <view
              class="description XtxGuess--description sk-transparent sk-text-14-2857-982 sk-text"
              >白色大理石</view
            >
          </navigator>
          <navigator class="guess-item XtxGuess--guess-item">
            <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
            <view class="name XtxGuess--name sk-transparent sk-text-14-2857-689 sk-text">黄色</view>
            <view class="badge XtxGuess--badge">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge"
                class="uni-badge-left-margin XtxGuess--uni-badge-left-margin"
              >
                <view class="uni-badge--x badge--uni-badge--x">
                  <text
                    class="uni-badge--primary badge--uni-badge--primary uni-badge--small badge--uni-badge--small uni-badge badge--uni-badge sk-transparent sk-text-16-6667-570 sk-text"
                    style="background-position-x: 50%"
                    >新发布</text
                  >
                </view>
              </view>
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge"
                class="uni-badge-left-margin XtxGuess--uni-badge-left-margin"
              >
                <view class="uni-badge--x badge--uni-badge--x">
                  <text
                    class="uni-badge--error badge--uni-badge--error uni-badge--small badge--uni-badge--small uni-badge badge--uni-badge sk-transparent sk-text-16-6667-21 sk-text"
                    style="background-position-x: 50%"
                    >热门</text
                  >
                </view>
              </view>
            </view>
            <view
              class="description XtxGuess--description sk-transparent sk-text-14-2857-963 sk-text"
              >大理石1</view
            >
          </navigator>
          <navigator class="guess-item XtxGuess--guess-item">
            <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
          </navigator>
          <navigator class="guess-item XtxGuess--guess-item">
            <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
          </navigator>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-6-2500-618 {
  background-image: linear-gradient(
    transparent 6.25%,
    #eeeeee 0%,
    #eeeeee 93.75%,
    transparent 0%
  ) !important;
  background-size: 100% 27.907rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-83 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-16-6667-131 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 36.6279rpx;
  position: relative !important;
}
.sk-text-14-2857-601 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-22-2222-500 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 50.2326rpx;
  position: relative !important;
}
.sk-text-14-2857-384 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-16-6667-819 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-text-16-6667-310 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-text-14-2857-982 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-689 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-16-6667-570 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-text-16-6667-21 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-text-14-2857-963 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
