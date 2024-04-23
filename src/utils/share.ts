const shareSuccess = () => {
  uni.showToast({
    title: '分享成功',
  })
}

const shareFail = () => {
  uni.showToast({
    title: '分享失败',
    icon: 'none',
  })
}

const share = {
  title: '骏腾石材-大理石陈',
  path: '/pages/index/index', // 默认分享路径
  desc: '20年专业大理石服务',
  // imageUrl: 'https://static.xhpolaris.com/static/meowchat/cover.png', // 默认分享图片
}

export default {
  onShareAppMessage() {
    return {
      ...share,
      success() {
        shareSuccess()
      },
      fail() {
        shareFail()
      },
    }
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      ...share,
      success() {
        shareSuccess()
      },
      fail() {
        shareFail()
      },
    }
  },
  share,
}
