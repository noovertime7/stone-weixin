import type { PageParams, StringData } from '@/types/global'
import type { PageRecord, Record } from '@/types/record_d'
import { http } from '@/utils/http'

export const createRecord = (data: Record) => {
  return http<StringData>({
    method: 'POST',
    url: `/record`,
    data,
  })
}

export const pageRecord = (data: PageParams) => {
  return http<PageRecord>({
    method: 'GET',
    url: `/record/page`,
    data,
  })
}
