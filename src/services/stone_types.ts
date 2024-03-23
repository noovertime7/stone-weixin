import type { StringData } from '@/types/global'
import type { CreateStone, StoneType } from '@/types/stone_types'
import { http } from '@/utils/http'

export const getStoneType = (id: number) => {
  return http<StoneType>({
    method: 'GET',
    url: `/stoneType/${id}`,
  })
}

export const deleteStoneType = (id: number) => {
  return http<StringData>({
    method: 'DELETE',
    url: `/stoneType/${id}`,
  })
}

export const createStoneType = (data: CreateStone) => {
  return http<StringData>({
    method: 'POST',
    url: `/stoneType`,
    data,
  })
}

export const updateStoneType = (id: string, name: string) => {
  return http<StringData>({
    method: 'PUT',
    url: `/stoneType/${id}/${name}`,
  })
}

export const stoneTypeList = (withStone: string = '') => {
  return http<StoneType[]>({
    method: 'GET',
    url: `/stoneTypes?withStone=${withStone}`,
  })
}
