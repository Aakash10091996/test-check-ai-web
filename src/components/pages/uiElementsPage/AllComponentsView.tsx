import React, { useEffect, useState } from "react";
import { useGetRatedComponentTags } from "@/services/typesense";
import AllComponentsCard from "@/components/pages/uiElementsPage/AllComponentsCard";
import * as Skeleton from "@/public/skeleton-svg/";
import { useTheme } from "next-themes";

type SkeletonComponents = Record<string, React.ComponentType<unknown> | undefined>;

function AllComponentsView() {
  const { data, isLoading } = useGetRatedComponentTags();
  const [skeletonExists, setSkeletonExists] = useState<boolean>(true);
  const TypedSkeleton: SkeletonComponents = Skeleton;
  const { theme } = useTheme();

  useEffect(() => {
    data?.forEach((details) => {
      const componentName = details.component_tags[0].replace(/\s/g, "");
      const skeletonName = getComponentName(componentName);
      if (!TypedSkeleton[skeletonName]) {
        setSkeletonExists(false);
      }
    });
  }, [data]);

  const getComponentName = (name: string) => {
    const transformedName = name.replace(/\s/g, "");
    return theme === "dark" ? `${transformedName}Dark` : transformedName;
  };

  const DummyLight = () => <Skeleton.Dummy />;
  const DummyDark = () => <Skeleton.DummyDark />;
  const DummySkeleton = theme === "dark" ? DummyDark : DummyLight;

  return (
    <>
      {data?.length ? (
        <div className="mt-7 flex min-h-[calc(100dvh-64px)] w-[inherit] flex-wrap justify-center gap-5 gap-x-2 p-4">
          {data.map((details) => {
            const componentName = details.component_tags[0].replace(/\s/g, "");
            const skeletonName = getComponentName(componentName);
            const SkeletonComponent = TypedSkeleton[skeletonName] ?? DummySkeleton;
            return (
              <div
                key={details.component_id}
                className="box-border rounded-lg border-[1px] border-solid bg-muted hover:border-primary dark:border-neutral-800 dark:bg-gray-900 dark:hover:border-primary"
              >
                <AllComponentsCard details={details} SkeletonComponent={SkeletonComponent} />
              </div>
            );
          })}
        </div>
      ) : null}
      {isLoading && skeletonExists && (
        <div className="flex h-[calc(100dvh-64px)] min-h-fit items-center justify-center align-middle">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      )}
    </>
  );
}

export default AllComponentsView;
