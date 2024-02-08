# Building Hypermedia Applications with htmx, react and bun

In this series of posts, we will explore hypermedia APIs and use [htmx](https://htmx.org/) to build a simple search application that querys characters from the `Start Wars` universe, using this free api:

[swapi.dev/api](https://swapi.dev/api)

The source code for this post can be found here, pull [this gihub repo](github/building-hypermedia-applications-with-htmx-react-and-bun) and follow along with these examples.

The stack includes the following:
- htmx
- bun
- elysiajs
- react


### Server Side Rendering with JSX/React

This first post focuses on server side rendering.  In order to render HTML server side, we need to use a templating engine, many exist, `handlebars`, `pug` and `nunjucks` are poplular examples.  We will be using Typescript and I wanted to use typed templates so we will be using `JSX/React` as a template engine.

I have chosen to use [Elysia](https://elysiajs.com/), a web framework that runs on the `Bun` runtime, Elysia has support for rendering `JSX` server side out of the box.

So before we begin make sure you have Bun installed on your machine

```
curl -fsSL https://bun.sh/install | bash
```

You can then navigate to the repo above, and install the dependencies and start the application,

```bash
bun install
npm run start
```

This will install two dependencies
```
elysia
@elysiajs/html
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

IMAGE HERE

## Lets get JSX working as a template engine
In order to use React/JSX as a template engine, we need to bare a few things in mind, just like when building react applications client side; all files that use JSX need to have the file extension `.jsx` or in our case, we are using Typescript, so `.tsx`.

As we are using Typescript, the second thing to consider here is to set the following compiler options in our `tsconfig` file, `jsx`, `jsxFactory` and `jsxFragmentFactory`. This will allow us to to use the `@elysiajs/html` plugin to handle JSX.

More information here on the elysiajs html plugin
[html-plugin](https://elysiajs.com/plugins/html.html#html-plugin)

`tsconfig.json`
```
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "Html.createElement",
    "jsxFragmentFactory": "Html.Fragment",
    ....
  }
}
```

## Lets build

Creating a server using `elysia` is very similar to other javascript server side frameworks like `express`. We instantiate a new app, and attach any plugins or middleware.  We can add our routes, and listen on a port.  The server below is super simple, and uses the aforementioned `@elysiajs/html` plugin to handle JSX, and we attach a single route, `Index`, that returns our HTML page, via a JSX template.

`src/index.tsx`
```
import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import { Index } from './api'

export const app = new Elysia()
  .use(html())
  .get("/", Index)
  .listen(3000)

export type App = typeof app
```

Our `Index` page, performs a search and renders various elements:

- `Layout` - renders, `html`, `head`, and `body` tags.
- `Home` - renders a search form, with an `input` tag called `search`
- `CharacterList` - renders the search results

The `starwars` search service, takes the `input` from the `elysia` `query` object, and queries the `starwars` api.  The data returned is passed to the `CharacterList` which renders the people returned.

An important note, the react elements are wrapped via the `html` function, from the plugin `@elysiajs/html`.


`src/api/index.tsx`
```
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
```

The `Layout` component, is a simple HTML page, we also import `tailwindcss` to add some styles to our page. Important note, this component has `children` as argument, so we need to use the `html` function `PropsWithChildren` to handle this correctly.  We also [Handle xss issues](https://elysiajs.com/plugins/html.html#xss), with `children as 'safe'`.

`src/components/layout.tsx`
```
export type LayoutType = {
  title?: string
  children?: JSX.Element
}

export function Layout({ title, children }: Html.PropsWithChildren<LayoutType>): JSX.Element {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <title safe>{title}</title>
        </head>
        <body>
          <div class="m-8">
            {children as 'safe'}
          </div>
        </body>
      </html>
    </>
  );
}
```

The `Home` component renders a simple form, which posts to root `/` This form has a single `input` element, we also render the `children`, which is a `CharacterList` component, we again are using `PropsWithChildren` to handle `jsx`.

`src/components/home.tsx`
```
export type HomeType = {
  title?: string
  children?: JSX.Element
}

export function Home({ title, children }: Html.PropsWithChildren<HomeType>): JSX.Element {
  return (
    <div class="m-8">
      <h1 class="text-8xl font-bold" safe>
        {title}.
      </h1>
      <form action="/">
        <input
          class="mt-8 p-4 text-6xl font-bold text-blue-700 border-2 border-gray-100 rounded-md"
          autofocus="true"
          type="search"
          name="search"
          placeholder="Search..."
        />
      </form>
      <div id="results">{children}</div>
    </div>
  )
}
```

The `CharacterList` component takes the results returned from the `starwars` api as argument, for each result item renders a `Character` component.

`src/components/characterList.tsx`
```
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
```

The `Character` component simply renders a single character.

`src/components/character.tsx`
```
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
```

The `starwars` service simply calls the api, accepting a query as argument, and returns results in `json` format.

`src/services/starwars.ts`
```
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
```
