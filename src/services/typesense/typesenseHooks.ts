"use client";

import { useQuery } from "@tanstack/react-query";
import { asClientCallForReactQuery } from "@/utils";
import {
  getComponentPacks,
  getCategoriesWithComponentTags,
  getRatedComponentTags,
  getSearchSuggestions,
  getComponentsPerTag,
  getUIElementsPerTag,
  getCategoriesWithUIElemetsTags,
} from "@/services/server_actions";
import type {
  ComponentAnalyticsData,
  FilterOptionsForCategorySearch,
  SearchResult,
  componentFacetResult,
  MarketplaceProjectsResult,
} from "@/types/typesense";
import { TYPESENSE_API_KEYS } from "@/services/typesense";

/**
 *Page: projects, Data: all componentpacks with 6 components
 */
export const useGetComponentPacks = (filterBy: string) => {
  return useQuery({
    queryKey: [TYPESENSE_API_KEYS.getComponentPacksKey, filterBy],
    queryFn: asClientCallForReactQuery<MarketplaceProjectsResult[]>(getComponentPacks),
    enabled: !!filterBy,
    refetchOnWindowFocus: false,
  });
};

/**
 *  Page: components, Data: all component tags to show in sidebar
 *  previously name: useGetFacets
 */
export const useGetCategoriesWithComponentTags = (facetType: string) => {
  return useQuery({
    queryKey: ["getCategoriesWithComponentTags", facetType],
    queryFn: asClientCallForReactQuery<componentFacetResult[]>(getCategoriesWithComponentTags),
    enabled: !!facetType,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/**
 *  Page: components, Data: all component tags to show in sidebar
 *  previously name: useGetFacets
 */
export const useGetCategoriesWithUIElemetsTags = (facetType: string) => {
  return useQuery({
    queryKey: ["getCategoriesWithUIElemetsTags", facetType],
    queryFn: asClientCallForReactQuery<componentFacetResult[]>(getCategoriesWithUIElemetsTags),
    enabled: !!facetType,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/**
 *  Page: all pages, Data: all suggestions upto 20 results
 */
export const useGetSearchSuggestions = (searchTerm: string) => {
  return useQuery({
    queryKey: ["getSearchSuggestions", searchTerm],
    queryFn: asClientCallForReactQuery<
      | {
          key: string;
          value: string;
        }[]
      | undefined
    >(getSearchSuggestions),
    enabled: !!searchTerm,
  });
};

/**
 *  Page: components, Data: 5 components per tag (on click on compoennt tag from sidebar)
 */
export const useGetComponentsPerTag = (options: FilterOptionsForCategorySearch) => {
  const { filter_by, pageNo } = options;
  return useQuery({
    queryKey: ["getComponentsPerTag", filter_by, pageNo.toString()],
    queryFn: asClientCallForReactQuery<SearchResult>(getComponentsPerTag),
    enabled: !!options,
  });
};

/**
 *  Page: uielements, Data: 5 components per tag (on click on compoennt tag from sidebar)
 */
export const useGetUIElementsPerTag = (options: FilterOptionsForCategorySearch) => {
  const { filter_by, pageNo } = options;
  return useQuery({
    queryKey: ["getUIElementsPerTag", filter_by, pageNo.toString()],
    queryFn: asClientCallForReactQuery<SearchResult>(getUIElementsPerTag),
    enabled: !!options,
  });
};

/**
 * page: landing page Data: component tag list with details
 * previous name: useMixpanelTypesenseData
 */
export const useGetRatedComponentTags = () => {
  return useQuery({
    queryKey: ["getRatedComponentTags"],
    queryFn: asClientCallForReactQuery<ComponentAnalyticsData[]>(getRatedComponentTags),
    refetchOnWindowFocus: false,
    // cacheTime: 9000000,
    staleTime: 6000000,
  });
};
