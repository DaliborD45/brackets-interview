import { characterType } from "./character"

export type dataType = {
  count: number
  next: string | null
  previous: string | null
  results: characterType[]
}
