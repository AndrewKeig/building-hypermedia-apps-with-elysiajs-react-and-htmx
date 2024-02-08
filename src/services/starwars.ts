import { CharacterType } from "../components/character";

export type StarWarsResponseType = {
  count: number;
  results: CharacterType[]
  query: string
}

export const search = async (query: string): Promise<StarWarsResponseType> => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${query}`)
  return response.json()
}
