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
