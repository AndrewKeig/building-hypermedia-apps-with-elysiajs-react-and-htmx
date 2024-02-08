import { Layout } from '../components/layout'
import { Home } from '../components/home'
import { CharacterList } from '../components/characterList'
import { search } from '../services/starwars'

export type IndexType = {
  html: (children: JSX.Element) => JSX.Element
  query: string
}

export const Index = async ({ html, query }: IndexType): Promise<JSX.Element> => {
  const title = 'These are not the droids you are looking for'
  const q = query?.search?.toString() || ''
  const data = await search(q)

  return html(
    <Layout title={title}>
      <Home title={title}>
        <CharacterList count={data?.count} results={data?.results} query={q} />
      </Home>
    </Layout>
  )
}
