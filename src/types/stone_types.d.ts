import type { Stone } from './stone'

export type StoneType = {
  id: number
  name: string
  stones: Stone[] | []
}

export type CreateStone = {
  Name: string
}
