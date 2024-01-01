import { get } from '@/net'
import { Accessor, createResource } from 'solid-js'

export const platformList = () => {
  const url = '/data/console.json'
  const res = createResource(() => get<Platform[]>(url))
  return res
}

export const gameList = (platform: Accessor<string>) => {
  const res = createResource(() =>
    get<Game[]>(`/data/console/${platform()}.json`),
  )
  return res
}
