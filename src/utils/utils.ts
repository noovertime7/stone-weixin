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

/**
 * 查询明天天气并弹窗提醒注意安全
 * @param location 城市名称，如"济南市"
 */
export const showWeatherReminder = (location: string) => {
  if (!location) return
  // 提取城市名（去掉省市区后缀）
  const city = location.replace(/(省|市|区|县|镇|乡)/g, '').trim()
  if (!city) return

  uni.request({
    url: `https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=zh`,
    timeout: 8000,
    success: (res) => {
      try {
        const data = res.data as any
        const tomorrow = data?.weather?.[1] || data?.weather?.[0]
        if (!tomorrow) return showFallbackReminder(location)

        const date = tomorrow.date
        const maxTemp = tomorrow.maxtempC
        const minTemp = tomorrow.mintempC
        const hourly = tomorrow.hourly || []
        // 取中午时段天气描述
        const noonWeather = hourly[4] || hourly[0] || {}
        const desc = noonWeather.lang_zh?.[0]?.value || noonWeather.weatherDesc?.[0]?.value || '未知'
        const windSpeed = noonWeather.windspeedKmph || '0'
        const windLevel = Math.round(parseInt(windSpeed) / 10) || 1

        // 降雨概率
        const rainChance = noonWeather.chanceofrain || '0'

        let weatherTip = ''
        if (parseInt(rainChance) > 50) {
          weatherTip = '明天有降雨可能，室外施工请注意防雨，大理石搬运注意防滑。'
        } else if (parseInt(maxTemp) > 35) {
          weatherTip = '明天高温，请注意防暑降温，合理安排施工时间。'
        } else if (parseInt(minTemp) < 5) {
          weatherTip = '明天低温，注意保暖，粘结剂施工需注意温度要求。'
        } else if (windLevel >= 5) {
          weatherTip = '明天风力较大，高空作业注意安全，材料堆放做好防护。'
        } else {
          weatherTip = '明天天气适宜施工，注意安全，保重身体！'
        }

        uni.showModal({
          title: '🌤 施工天气提醒',
          content: `${location}明天（${date}）\n天气：${desc}\n温度：${minTemp}°C ~ ${maxTemp}°C\n风力：${windLevel}级\n降雨概率：${rainChance}%\n\n💡 ${weatherTip}\n\n陈师傅辛苦了，外出施工注意安全！`,
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#c9a96e',
        })
      } catch {
        showFallbackReminder(location)
      }
    },
    fail: () => {
      showFallbackReminder(location)
    },
  })
}

const showFallbackReminder = (location: string) => {
  uni.showModal({
    title: '⚠️ 施工安全提醒',
    content: `在${location}施工辛苦了！\n\n请记得：\n· 关注当地天气预报，做好防雨防晒准备\n· 搬运大理石注意腰部保护\n· 高空作业系好安全带\n· 切割石材佩戴防尘口罩\n\n陈师傅辛苦了，注意安全！`,
    showCancel: false,
    confirmText: '知道了',
    confirmColor: '#c9a96e',
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
