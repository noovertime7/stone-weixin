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

export const upload = async (file: image) => {
  return new Promise<UploadResponse | null>((resolve, reject) => {
    uni.uploadFile({
      url: 'http://127.0.0.1:8880/api/v1/upload',
      filePath: file.tempFilePath,
      name: 'file',
      success: (res) => {
        const responseData = JSON.parse(res.data) as UploadResponse
        console.log('上传成功', responseData)
        resolve(responseData)
      },
      fail: (fail) => {
        console.log('上传失败', fail)
        uni.showToast({
          title: `上传失败，请稍后重试:${fail.errMsg}`,
          icon: 'none',
          duration: 2000,
        })
        reject(null)
      },
    })
  })
}
