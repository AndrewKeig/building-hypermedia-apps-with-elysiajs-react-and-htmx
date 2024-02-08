import { StarWarsResponseType } from '../services/starwars'
import { Character, CharacterType } from './character'

export function CharacterList({ results, count, query }: StarWarsResponseType): JSX.Element {
  const items = results?.map((d: CharacterType) => <Character {...d} />)
  return (
    <div class="mt-4">
      <h1 class="mb-4"> Found <span safe>{count}</span> results for <span safe>{query}</span>.</h1>
      <span>{items}</span>
    </div>
  )
}
