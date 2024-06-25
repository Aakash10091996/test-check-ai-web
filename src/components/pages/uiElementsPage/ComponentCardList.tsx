import { useCallback, useEffect, useRef, useState } from "react";
import { useGetComponentsPerTag } from "@/services/typesense";
// import { searchCategory } from "@/constants";
import type { ComponentData } from "@/types";
import { useSortedData } from "@/hooks/uiElements/useSortedData";
import { removeHyphen } from "@/utils";
import CanvasAndCodeCard from "@/components/pages/uiElementsPage/CanvasAndCodeCard";

function ComponentCardList() {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [apiRequestBody, setApiRequestBody] = useState({
    filter_by: "",
    // component_pack_name: searchCategory[0].value,
    pageNo: 1,
  });
  const [allComponentsList, setAllComponentsList] = useState<ComponentData[]>([]);
  const { activeCategoryItem } = useSortedData();
  const { data, isFetching } = useGetComponentsPerTag(apiRequestBody);

  const intObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const list: ComponentData[] = data?.componentsList ? [...data.componentsList] : [];
    if (list.length) {
      if (apiRequestBody.pageNo === 1) {
        setAllComponentsList(list);
      } else {
        setAllComponentsList((prevData) => [...prevData, ...list]);
      }
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
    setIsFetchingNextPage(false);
  }, [data, apiRequestBody.pageNo]);

  useEffect(() => {
    if (activeCategoryItem) {
      setApiRequestBody({
        filter_by: removeHyphen(activeCategoryItem),
        // component_pack_name: searchCategory[0].value,
        pageNo: 1,
      });
      setAllComponentsList([]);
      setHasNextPage(false);
    }
  }, [activeCategoryItem]);

  const lastPostRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          setIsFetchingNextPage(true);
          setApiRequestBody((prev) => ({
            ...prev,
            pageNo: prev.pageNo + 1,
          }));
        }
      });

      if (node) intObserver.current.observe(node);

      return () => {
        if (intObserver.current) intObserver.current.disconnect();
      };
    },
    [hasNextPage, isFetchingNextPage]
  );

  return (
    <div>
      {allComponentsList?.length ? (
        <>
          {allComponentsList.map((element: ComponentData, index: number) => (
            <CanvasAndCodeCard
              key={index}
              data={element.document}
              // id={element.document.component_id}
              category={element.document.component_name}
              lastPostRef={lastPostRef}
              // projectId={element.document.component_pack_id}
            />
          ))}
        </>
      ) : null}
      {isFetching && (
        <div className="flex h-[86vh] items-center justify-center">
          <div className="mx-auto my-8 flex size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      )}
      {allComponentsList?.length < 1 && !isFetching && (
        <div className="my-4 flex min-h-[350px] w-full flex-col items-center justify-start rounded-xl border bg-lightGrayBackground p-1 text-card-foreground dark:bg-aiBackground sm:p-2">
          <div className="flex w-full items-center justify-between">
            <div className="w-52  rounded-full bg-muted p-2" />
            <div className="w-36 rounded-lg bg-muted p-5" />
          </div>
          <div className="flex h-56 w-full items-center justify-center font-semibold opacity-40">
            <span>No Components</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentCardList;
