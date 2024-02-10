export type HomeType = {
  title?: string
  children?: JSX.Element
}

export function Home({ title }: Html.PropsWithChildren<{ title?: string }>) {
  return (
    <div class="m-8" >
      <h1 class="text-8xl font-bold" safe>
        {title}.
      </h1>
      <input
        class="mt-8 p-4 text-6xl font-bold text-blue-700 border-2 border-gray-100 rounded-md"
        autofocus="true"
        type="search"
        name="search"
        placeholder="Search..."
        hx-get="/search"
        hx-trigger="keyup changed delay:500ms"
        hx-target="#results"
        hx-indicator=".htmx-indicator"
      />
      <div id="results">
        <img width="64" class="htmx-indicator" src="/public/loading.svg"/>
      </div>
    </div>
  )
}
