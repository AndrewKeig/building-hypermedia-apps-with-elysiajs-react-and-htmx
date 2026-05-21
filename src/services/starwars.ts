import { CharacterType } from "../components/character";

export type StarWarsResponseType = {
  count: number;
  results: CharacterType[]
  query: string
}

export const search = async (query: string): Promise<StarWarsResponseType> => {
  const response = await fetch(`https://swapi.info/api/people`)
  const data = await response.json()
  const results = data.filter((c: CharacterType) => c.name?.toLowerCase().includes(query.toLowerCase()))

  return {
    results,
    count: results.length,
    query
  }
}
