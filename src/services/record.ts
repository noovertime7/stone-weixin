import type { StringData } from '@/types/global'
import type { Record } from '@/types/record_d'
import { http } from '@/utils/http'

export const createRecord = (data: Record) => {
  return http<StringData>({
    method: 'POST',
    url: `/record`,
    data,
  })
}
