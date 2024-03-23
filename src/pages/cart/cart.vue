<template>
  <view class="address">
    <view class="container">
      <button bindtap="getLocation">打开地图选择位置</button>
      <view>
        <view>位置名称:{{ name }}</view>
        <view>详细地址:{{ address }}</view>
        <view>纬度:{{ latitude }}</view>
        <view>经度:{{ longitude }}</view>
      </view>
    </view>
  </view>
  <view @click="clickSite">点击选择位置</view>
</template>

<script>
export default {
  components: {
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  },
  data() {
    return {
      pageNum: 1,
      data: {
        name: '',
        address: '',
        latitude: '',
        longitude: '',
      },
    }
  },
  // 页面加载
  onLoad(e) {
    uni.hideTabBar() //不让底部显示tab选项
    this.getData()
  },
  // 页面显示
  onShow() {},
  // 方法
  methods: {
    clickSite() {
      // 所在地址
      var _this = this
      wx.chooseLocation({
        success: function (res) {
          var name = res.name
          var address = res.address
          var latitude = res.latitude
          var longitude = res.longitude
          _this.form.city = res.address
          _this.form.city1 = res.address
          console.log(name, address, latitude, longitude, '158')
        },
        complete(res) {
          // 点击确定完成以后-进入对应的页面
          console.log(res, '161')

          if (res.errMsg == 'chooseLocation:fail cancel') {
            console.log(111)
          } else {
            console.log(22)
          }
        },
      })
    },
    //获取数据
    getData() {
      var _this = this
      wx.chooseLocation({
        success: function (res) {
          var name = res.name
          var address = res.address
          var latitude = res.latitude
          var longitude = res.longitude

          console.log(name, address, latitude, longitude, '58')
        },
        complete(r) {
          // 点击确定完成以后-进入对应的页面
          console.log(r, '71')
        },
      })
    },
    //获取列表数据
    getListData() {
      this.$.ajax(
        'POST',
        '/xxxxx/xxxxx',
        {
          page: this.pageNum,
        },
        (res) => {
          if (res) {
            if (this.pageNum == 1) {
              this.list = res.data
            } else {
              this.list = this.list.concat(res.data)
              if (res.data.length === 0) {
                this.pageNum--
              }
            }
          }
          uni.stopPullDownRefresh()
        },
      )
    },
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 页面隐藏
  onHide() {},
  // 页面卸载
  onUnload() {},
  // 触发下拉刷新
  onPullDownRefresh() {
    this.pageNum = 1
    // this.getListData()
  },
  // 页面上拉触底事件的处理函数
  onReachBottom() {
    this.pageNum++
    // this.getListData()
  },
}
</script>

<style lang="scss" scoped>
.address {
}
</style>
