import type { Common } from './global'

export type Record = Common & {
  id: number
  stoneId: number
  stoneName?: ''
  video: string
  images: string[] // 这里可能需要根据实际情况更改为适当的类型
  location: string
  detailedlocation: string // 详细地址
  description: string
  longitude: number
  latitude: number
}

export type PageRecord = {
  total: number
  list: Record[]
  page: number
  pageSize: number
}
