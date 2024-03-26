<template>
  <!-- 视频 -->
  <view class="videoBox">
    <video
      :style="{ width: 2 * videoWidth + 'rpx' }"
      id="videoId"
      class="video"
      :src="props.url"
      :autoplay="props.autoplay"
      object-fit="fill"
      @fullscreenchange="handleFullScreen"
      @controlstoggle="handleControlstoggle"
    >
      <!-- 后退按钮 -->
      <cover-view class="backBtn">大理石陈 18605486770</cover-view>

      <!-- 倍速按钮 -->
      <cover-view v-if="speedState && controlsToggle" class="speed">
        <text @click="speedNum = true" class="doubleSpeed">倍速</text>
      </cover-view>
      <!-- 倍速面板 -->
      <cover-view
        v-if="speedNum"
        class="speedModal"
        @click.stop="speedNum = false"
        :style="{ width: clientHeight + 37 + 'px', height: videoWidth + 16 + 'px' }"
      >
        <view class="speedNumBox" :style="{ height: videoWidth + 16 + 'px' }">
          <text
            @click.stop="handleSetSpeedRate(0.5)"
            :class="[0.5 == speedRate ? activeClass : errorClass, 'number']"
            >0.5</text
          >
          <text
            @click.stop="handleSetSpeedRate(0.8)"
            :class="[0.8 == speedRate ? activeClass : errorClass, 'number']"
            >0.8</text
          >
          <text
            @click.stop="handleSetSpeedRate(1)"
            :class="[1 == speedRate ? activeClass : errorClass, 'number']"
            >1</text
          >
          <text
            @click.stop="handleSetSpeedRate(1.25)"
            :class="[1.25 == speedRate ? activeClass : errorClass, 'number']"
            >1.25</text
          >
          <text
            @click.stop="handleSetSpeedRate(1.5)"
            :class="[1.5 == speedRate ? activeClass : errorClass, 'number']"
            >1.5</text
          >
        </view>
      </cover-view>
    </video>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
//视频播放的url

const props = defineProps({
  url: {
    type: String,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
})
/*======================================== 设置视频宽度 ===============================================*/
let videoWidth = ref(0) //设置视频宽度
let clientHeight = ref(0) //设备高度
onLoad(() => {
  uni.getSystemInfo({
    success: function (res) {
      videoWidth.value = res.screenWidth - 16
      clientHeight.value = res.screenHeight
    },
  })
})

/*======================================== 倍速功能模块 ===============================================*/
let speedState = ref(false) //监听全屏和退出全屏，控制对应的“返回按钮和倍速按钮是否显示”
let speedNum = ref(false) //倍速的数字蒙版（0.5，0.8，1.0，1.25，1.5）
const activeClass = ref('active') //选中倍速时的颜色样式active是类名
const errorClass = ref('noActive') //非选中的颜色样式noActive是类名
let speedRate = ref(1) //倍速的值（用来判断选中状态）
//监听进入全屏 和 退出全屏
const handleFullScreen = (e) => {
  //e.detail对象的两个属性fullScreen和direction，一个可以得到true/false 另一个得到horizontal/vertical
  speedState.value = e.detail.fullScreen
}
//倍速按钮：显示的条件  1.首先全屏   2.控件（播放/暂停按钮、播放进度、时间）是显示状态
let controlsToggle = ref(false)
const handleControlstoggle = (e) => {
  controlsToggle.value = e.detail.show
}
//设置倍速速度
const handleSetSpeedRate = (rate) => {
  let videoContext = uni.createVideoContext('videoId')
  videoContext.playbackRate(rate)
  speedRate.value = rate
}
</script>

<style scoped lang="scss">
.videoBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.video {
}
.backBtn {
  position: absolute;
  left: 16rpx;
  top: 45rpx;
  height: 45rpx;
}
.speed {
  position: absolute;
  right: 20rpx;
  top: 16rpx;
  .doubleSpeed {
    color: #fff;
    font-size: 14rpx;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 4rpx 6rpx;
  }
}

// 倍速的蒙版
.speedModal {
  background-color: rgba(0, 0, 0, 0.7);
}
.speedNumBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #2c2c2c;
  width: 120rpx;
  position: absolute;
  right: 0rpx;
  top: 0;
  .number {
    width: 120rpx;
    font-weight: 700;
    font-size: 14rpx;
    padding: 18rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .active {
    color: red;
  }
  .noActive {
    color: #fff;
  }
}
</style>
