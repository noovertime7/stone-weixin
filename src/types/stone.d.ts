export type Stone = {
  id: number
  stoneTypeId: number
  name: string
  coverImages: string[]
  detailImages: string[]
  description: string
  hot: number
  created_at: string
  updated_at: string
  buyNum: number
}

export type PageStone = {
  total: number
  list: Stone[]
  page: number
  pageSize: number
}
