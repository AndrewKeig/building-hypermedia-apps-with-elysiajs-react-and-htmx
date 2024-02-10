import { CharacterList } from '../components/characterList'
import { search } from '../services/starwars'

export type SearchType = {
  html: (children: JSX.Element) => JSX.Element
  query: string
}

export const Search = async ({ html, query }: SearchType) => {
  const q = query?.search?.toString() || ''
  const data = await search(q)
  return html(<CharacterList count={data?.count} results={data?.results} query={q} />)
}
