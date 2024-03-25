const QQMapWX = require('../static/public/qqmap-wx-jssdk')
//腾讯地图接口文件

// 实例化API核心key是腾讯地图秘钥
const qqmapsdk = new QQMapWX({
  key: 'FPJBZ-SNUKL-TLTPZ-EVHAB-QONYF-UXBKK', // 必填
})

type MyLocation = {
  longitude: number
  latitude: number
}

interface ReverseGeocodeResult {
  // Define the structure of the reverse geocode result according to your needs
}

export const getLocationAndReverseGeocode = (): Promise<MyLocation> => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      success: (res) => {
        const location: MyLocation = {
          longitude: res.longitude,
          latitude: res.latitude,
        }
        resolve(location)
      },
      fail: (error) => {
        console.log(error)

        uni.showToast({
          title: error,
          icon: 'error',
        })
        reject(error)
      },
    })
  })
}

export type address = {
  recommendlocation: string
  detailedlocation: string
  longitude: number // 精度
  latitude: number // 维度
}

export const openMap = (): Promise<address> => {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: function (res) {
        resolve({
          longitude: res.longitude,
          latitude: res.latitude,
          recommendlocation: res.name,
          detailedlocation: res.address,
        })
      },
      fail: (error) => {
        console.log(error)

        uni.showToast({
          title: error,
          icon: 'error',
        })
        reject(error)
      },
    })
  })
}

export const getAddressByLocation = (l: MyLocation): Promise<address> => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      sig: 'DABsgAELCBJvuZsGLUp6zH56YHnwWvLF',
      //腾讯地图接口
      location: {
        latitude: l.latitude,
        longitude: l.longitude,
      },
      success(res) {
        const result = res.result
        resolve({
          recommendlocation: result.formatted_addresses.recommend,
          detailedlocation: result.address,
          latitude: l.latitude,
          longitude: l.longitude,
        })
      },
      fail: (error) => {
        console.log(error)

        uni.showToast({
          title: error,
          icon: 'error',
        })
        reject(error)
      },
    })
  })
}
