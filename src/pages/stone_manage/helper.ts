import { baseAPI } from '@/utils/env_weixin_helper'

export type UploadResponse = {
  code: number
  data: string[]
  message: string
  trace_id: string
  stack: null | string
}
export type image = {
  tempFilePath: any
  name: string
}

export type StoneformData = {
  name: string
  coverImages: string[]
  detailImages: string[]
  stoneTypeId: number
  description: string
  hot: number
}

const uploadUrl = `${baseAPI}/api/v1/upload`

export const upload = async (file: image) => {
  return new Promise<UploadResponse | null>((resolve, reject) => {
    uni.uploadFile({
      url: uploadUrl,
      filePath: file.tempFilePath,
      name: 'file',
      success: (res) => {
        const responseData = JSON.parse(res.data) as UploadResponse
        resolve(responseData)
      },
      fail: (fail) => {
        uni.showToast({
          title: `${fail.errMsg}`,
          icon: 'none',
          duration: 2000,
        })
        reject(null)
      },
    })
  })
}
