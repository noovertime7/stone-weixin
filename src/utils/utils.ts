export const copyWeixinNum = () => {
  uni.setClipboardData({
    data: 'yingshiqiangdingzhi',
    success: function () {
      uni.showToast({
        title: '已复制微信号，请打开微信搜索添加',
        duration: 1500,
      })
    },
    fail: function () {
      uni.showToast({
        title: '复制微信号失败，请选择其他联系方式',
        duration: 1500,
      })
    },
  })
}

export const makeCall = () => {
  uni.makePhoneCall({
    phoneNumber: '18605486770', // 电话号码
  })
}
