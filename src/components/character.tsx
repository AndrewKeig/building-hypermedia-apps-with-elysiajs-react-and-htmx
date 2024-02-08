export type CharacterType = {
  name?: string,
  height?: string,
  mass?: string,
  hair_color?: string,
  skin_color?: string,
  eye_color?: string,
  birth_year?: string,
  gender?: string
  homeworld?: string,
  films?: string[],
  species?: string[],
  vehicles?: string[],
  starships?: string[],
  created?: string,
  edited?: string,
  url?: string,
}

export function Character({ name, height, mass, hair_color, skin_color, eye_color, birth_year, gender }: CharacterType): JSX.Element {
  return (
    <div class="mt-4">
      <h1 class="mb-4 text-4xl font-bold" safe>{name}</h1>
      <div>Height: {height}</div>
      <div>Mass {mass}</div>
      <div safe>Hair Color: {hair_color}</div>
      <div safe>Skin Color: {skin_color}</div>
      <div safe>Eye Color: {eye_color}</div>
      <div safe>Birth Year: {birth_year}</div>
      <div safe>Gender: {gender}</div>
    </div>
  )
}
