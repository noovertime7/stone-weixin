import type { Common } from './global'

export type Record = Common & {
  id: number
  stoneId: number
  stoneName?: ''
  video: string
  images: string[]
  location: string
  detailedlocation: string
  description: string
  longitude: number
  latitude: number
  date?: string
  viewCount: number
}

export type PageRecord = {
  total: number
  list: Record[]
  page: number
  pageSize: number
}
