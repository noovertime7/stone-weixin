import type { StoneformData } from '@/pages/stone_manage/helper'
import type { StringData, PageParams } from '@/types/global'
import type { PageStone, Stone } from '@/types/stone'
import { http } from '@/utils/http'

export const createStone = (data: StoneformData) => {
  return http<StringData>({
    method: 'POST',
    url: `/stone`,
    data,
  })
}

export const updateStone = (id: number, data: StoneformData) => {
  return http<StringData>({
    method: 'POST',
    url: `/stone/${id}/update`,
    data,
  })
}

export const pageStone = (data: PageParams) => {
  return http<PageStone>({
    method: 'GET',
    url: `/stone/page`,
    data,
  })
}

//  获取首页的图片列表
export const getHotStones = () => {
  return http<Stone[]>({
    method: 'GET',
    url: `/hotStones`,
  })
}

export const getStoneById = (id: number | string) => {
  return http<Stone>({
    method: 'GET',
    url: `/stone/${id}`,
  })
}

export const deleteStoneById = (id: number | string) => {
  return http<Stone>({
    method: 'DELETE',
    url: `/stone/${id}`,
  })
}

export const getStonesByTypeId = (tid: number | string) => {
  return http<Stone[]>({
    method: 'GET',
    url: `/stones/${tid}/bytype`,
  })
}

export const getSameStones = (id: number | string) => {
  return http<Stone[]>({
    method: 'GET',
    url: `/stones/${id}/same`,
  })
}
