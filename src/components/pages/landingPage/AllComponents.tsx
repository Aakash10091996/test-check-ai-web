"use client";
import { useEffect, useState } from "react";
import { useGetRatedComponentTags } from "@/services/typesense";
import { Label } from "@/components/ui";
import Link from "next/link";
import { addHyphen } from "@/utils";
import { COMPONENTS, defaultFramework, DefaultAllComponentItem } from "@/constants";
import * as Skeleton from "@/public/skeleton-svg/";
import { useTheme } from "next-themes";
import AnimatedButton from "@/components/ui/animatedButton";
import { RightArrowIcon } from "@/icons";

type SkeletonComponents = Record<string, React.ComponentType<unknown> | undefined>;

function AllComponents() {
  const { theme } = useTheme();
  const { data, isLoading } = useGetRatedComponentTags();
  const [skeletonExists, setSkeletonExists] = useState<boolean>(true);
  const TypedSkeleton: SkeletonComponents = Skeleton;

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
        <>
          <ul
            role="list"
            className="flex max-w-[1284px] flex-wrap items-center justify-center gap-x-5 px-1 pt-[42px] max-sm:h-[460px] max-sm:overflow-hidden lg:px-0"
          >
            {data.slice(0, 16).map((details) => {
              const componentName = details.component_tags[0].replace(/\s/g, "");
              const skeletonName = getComponentName(componentName);
              const Component = TypedSkeleton[skeletonName] ?? DummySkeleton;
              return (
                <Link
                  href={`${COMPONENTS}/${defaultFramework}/${addHyphen(details.component_tags[0])}`}
                  key={details.component_id}
                  className="col-span-1 mb-5 flex h-[194px] w-[306px] cursor-pointer flex-col  items-center rounded-lg border-[1px] border-lightGrayBorder bg-lightGray dark:border-darkBlueBg-foreground dark:bg-darkBlueBg-foreground max-sm:h-[120px] max-sm:w-[160px]"
                >
                  <div className="group relative mx-auto flex h-[150px] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-lg dark:bg-darkBlueBg-foreground max-sm:h-[90px]">
                    <Component />
                  </div>
                  <div className="flex h-[44px] w-full flex-row items-center justify-between gap-1 rounded-lg bg-white px-[15px] dark:bg-lightBlueBg-foreground">
                    <Label className="text-sm font-medium leading-5 text-darkGrayText dark:text-white max-sm:text-[8px]">
                      {details.component_tags[0]}
                    </Label>
                    <Label className="text-sm font-medium leading-5 text-breadcrumbGreyText dark:text-whiteSecText max-sm:text-[8px]">
                      {details.framework_select} components
                    </Label>
                  </div>
                </Link>
              );
            })}
          </ul>
          <div className="z-10 mt-[-274px] h-64 w-full bg-gradient-to-b from-transparent to-background max-sm:mt-[-175px] max-sm:h-44 " />
          <div className="z-20 rounded-xl bg-gradient-to-tr from-primary to-foreground p-[1px] transition-all duration-1000 hover:from-foreground hover:to-primary">
            <AnimatedButton text="Show more" icon={<RightArrowIcon />}>
              <Link
                href={`${COMPONENTS}/${defaultFramework}/${DefaultAllComponentItem}`}
                className="mb-5 flex size-fit items-center justify-center rounded-xl  text-sm font-bold leading-6 text-white"
              ></Link>
            </AnimatedButton>
          </div>
          <div className="z-10 mt-[-300px] h-64 w-full bg-gradient-to-t from-background to-transparent max-sm:hidden" />
        </>
      ) : null}
      {isLoading && skeletonExists && (
        <div className="flex h-[20vh] min-h-[20vh] items-center justify-center align-middle">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-blackShadeText border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite] dark:border-white dark:border-r-transparent" />
        </div>
      )}
    </>
  );
}

export default AllComponents;
