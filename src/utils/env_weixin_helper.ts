// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync()

// env类型
export const env = accountInfo.miniProgram.envVersion

if (!env) {
  console.error('获取运行环境失败!')
}

const baseApi = {
  // 开发版
  develop: 'http://192.168.1.135:8880',
  // 体验版
  trial: 'https://stone.yunxue521.top',
  // 正式版
  release: 'https://stone.yunxue521.top',
}

// request请求baseURL
export const baseURL = baseApi[env] + '/api/v1'
