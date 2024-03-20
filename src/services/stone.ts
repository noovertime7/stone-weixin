import type { StoneformData } from '@/pages/stone_add/helper'
import type { StringData, PageParams } from '@/types/global'
import type { PageStone } from '@/types/stone'
import { http } from '@/utils/http'

export const createStone = (data: StoneformData) => {
  return http<StringData>({
    method: 'POST',
    url: `/stone`,
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
