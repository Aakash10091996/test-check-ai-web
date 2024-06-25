import Image from "next/image";

type ComponentPack = {
  value: string;
  count: number;
  imageUrl: string;
  is_important: boolean;
};

type DataArray = ComponentPack[];

function ComponentTypesCards({ DataArray }: { DataArray: DataArray }) {
  return (
    <ul role="list" className="flex flex-wrap items-center justify-around">
      {DataArray.map((data, item) => (
        <li
          key={`${data.value}_${item}`}
          className="col-span-1 m-4 flex h-[310px] w-[24rem] flex-col items-center divide-y divide-accent rounded-lg p-3 pb-6 shadow-suggestionShadow hover:bg-accent dark:border  dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-accent max-md:pb-0"
        >
          <div className="group relative mx-auto h-[70%] w-[80%] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={data.imageUrl}
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute start-0 top-0 w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>

          <div className="p-4 pt-0 md:p-6">
            <h3 className="mt-6 text-sm font-medium text-foreground">{data.value}</h3>
            <dl className="mt-1 flex grow flex-col justify-between">
              <dt className="sr-only">{data.count}</dt>
              <dd className="text-sm text-muted-foreground">{data.value}</dd>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default ComponentTypesCards;
