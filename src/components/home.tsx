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
