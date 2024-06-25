export default function ComponentTypesCards({ data }: { data: number[] }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item, index) => (
        <li
          key={`${item}+${index}`}
          className="col-span-1 flex flex-col divide-y divide-background rounded-lg bg-white shadow-md hover:bg-muted-foreground dark:bg-muted dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-muted"
        >
          <div className="flex flex-1 flex-col p-8">
            <div className="mx-auto h-32 w-40 shrink-0 rounded-full" />
            <h3 className="mt-6 text-sm font-medium text-accent-foreground">Component Type</h3>
            <dl className="mt-1 flex grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-accent">Category</dd>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
