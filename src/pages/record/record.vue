<template>
  <view>
    <view><button @click="getLocation">获取位置</button></view>
    <view>
      <button @click="goHomeSquare">打开位置</button>
    </view>
  </view>
</template>

<script>
const QQMapWX = require('../../static/public/qqmap-wx-jssdk')
//腾讯地图接口文件

// 实例化API核心key是腾讯地图秘钥
var qqmapsdk = new QQMapWX({
  key: 'FPJBZ-SNUKL-TLTPZ-EVHAB-QONYF-UXBKK', // 必填
})

export default {
  data() {
    return {
      longitude: '',
      latitude: '',
      scale: 8,
      addressurl: '/pages/test/index',
    }
  },
  onShow() {
    this.getLocation()
  },
  methods: {
    goHomeSquare() {
      uni.chooseLocation({
        success: function (res) {
          console.log('chooseLocation', res)
          console.log('位置名称：' + res.name)
          console.log('详细地址：' + res.address)
          console.log('纬度：' + res.latitude)
          console.log('经度：' + res.longitude)
        },
      })
    },
    getLocation() {
      uni.getLocation({
        success: function (res) {
          this.longitude = res.longitude
          this.latitude = res.latitude
          console.log(res.longitude)
          console.log(res.latitude)

          qqmapsdk.reverseGeocoder({
            //腾讯地图接口
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success(res) {
              console.log('res', res)
            },
            fail: (e) => {
              console.log('error:', e)
            },
          })
        },
        fail: (res) => {
          console.log('res fail', res)
        },
      })
    },
  },
}
</script>

<style></style>
./qqmap-wx-jssdk.min.js ../../../public/qqmap-wx-jssdk ../../static/public/qqmap-wx-jssdk.js
