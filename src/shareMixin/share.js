export default {
  data() {
    return {
      share: {
        title: '骏腾石材',
        path: '/pages/index/index',
        desc: '骏腾石材专业大理石服务',
      },
    }
  },
  // 分享到微信好友功能
  onShareAppMessage(res) {
    return {
      title: this.share.title,
      path: this.share.path,
      desc: this.share.desc,
      imageUrl: this.share.imageUrl,
      success(res) {
        uni.showToast({
          title: '分享成功',
        })
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        })
      },
    }
  },
  // 分享到朋友圈功能
  onShareTimeline(res) {
    return {
      title: this.share.title,
      path: this.share.path,
      desc: this.share.desc,
      imageUrl: this.share.imageUrl,
      success(res) {
        uni.showToast({
          title: '分享成功',
        })
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        })
      },
    }
  },
}
