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

export function isNewlyPublished(created_at: string): boolean {
  // 将字符串形式的时间戳转换为 Date 对象
  const createdAtDate: Date = new Date(created_at)

  // 获取当前时间
  const currentDate: Date = new Date()

  // 定义时间阈值，例如最近一天内为最近发布
  const threshold: number = 24 * 60 * 60 * 1000 // 一天的毫秒数

  // 计算当前时间和发布时间的时间差
  const timeDifference: number = currentDate.getTime() - createdAtDate.getTime()

  // 如果时间差小于阈值，表示最近发布
  if (timeDifference < threshold) {
    return true
  } else {
    return false
  }
}
