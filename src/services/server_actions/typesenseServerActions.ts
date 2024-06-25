"use server";

import { TYPESENSE_COLLECTION, TYPESENSE_SORTED_COLLECTION } from "@/config/constants";
import typesenseClient from "@/config/typesenseClient";
import type {
  ComponentAnalyticsData,
  SearchResult,
  componentFacetResult,
  MarketplaceProjectsResult,
  ComponentData,
} from "@/types/typesense";
import type { SearchParams } from "typesense/lib/Typesense/Documents";
import {
  getFacetsParams,
  searchQueryParams,
  searchByTagsAndCategoryParams,
  getComponentPackDataParams,
} from "@/constants";
import { searchCategory } from "@/constants";

export const getComponentPacks = async (queryKey: string[]) => {
  const [filter_by] = queryKey.slice(1);
  const searchParameters: SearchParams = {
    ...getComponentPackDataParams,
    filter_by: `component_pack_tags:=${filter_by}`,
  };
  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchParameters);
  const result = data.grouped_hits as MarketplaceProjectsResult[];
  return result;
};

export const getComponentsPerTag = async (queryKey: string[]): Promise<SearchResult> => {
  const [filter_by, pageNo] = queryKey.slice(1);

  const searchByTagsAndCategoryParameters: SearchParams = {
    ...searchByTagsAndCategoryParams,
    page: +pageNo,
  };

  if (filter_by) {
    searchByTagsAndCategoryParameters.filter_by = `(component_filter_lvl_0:=${searchCategory[0].value} > ${filter_by}) || (component_filter_lvl_0:=${searchCategory[1].value} > ${filter_by})`;
  } else {
    searchByTagsAndCategoryParameters.filter_by = `(component_pack_tags:=${searchCategory[0].value}) || (component_pack_tags:=${searchCategory[1].value})`;
  }
  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchByTagsAndCategoryParameters);
  return { componentsList: data?.hits as ComponentData[], totalCount: data?.out_of };
};

export const getCategoriesWithComponentTags = async (queryKey: string[]) => {
  const [facetType] = queryKey.slice(1);
  const searchParameters = {
    ...getFacetsParams,
    // filter_by: "is_ui_element:=false",
    facet_by:
      facetType === "components"
        ? "component_pack_tags,component_filter_lvl_0"
        : "component_pack_tags,sub_category",
  };

  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchParameters);

  const result: componentFacetResult[] = [];

  data?.facet_counts?.[0].counts.forEach((doc) => {
    if (doc.value === searchCategory[0].label || doc.value === searchCategory[1].label) {
      result.push({
        component_pack_name: doc.value,
        count: doc.count,
        components: [],
      });
    }
  });
  data?.facet_counts?.[1].counts.forEach((doc) => {
    const [x1, y1] = doc.value.split(" > ");
    result.forEach((x, index) => {
      if (
        x.component_pack_name === x1 &&
        y1 !== searchCategory[0].label &&
        y1 !== searchCategory[1].label
      ) {
        result[index] = {
          ...result[index],
          components: [
            ...result[index].components,
            {
              component_name: y1,
              count: doc.count,
            },
          ],
        };
      }
    });
  });
  return result;
  //   result.forEach((item) => {
  //     item.components.sort((a, b) => a.component_name.trim().localeCompare(b.component_name.trim()));
  //   });
  //   result.sort((a, b) => {
  //     return a.component_pack_name.trim().localeCompare(b.component_pack_name);
  //   });
};

export const getRatedComponentTags = async () => {
  const document = (await typesenseClient
    .collections(TYPESENSE_SORTED_COLLECTION)
    .documents("0")
    .retrieve()) as { components: ComponentAnalyticsData[]; id: string };

  const componentsData: ComponentAnalyticsData[] = document?.components;
  return componentsData;
};

export const getSearchSuggestions = async (queryKey: string[]) => {
  const [searchTerm] = queryKey.slice(1);
  const searchParameters: SearchParams = { ...searchQueryParams, q: searchTerm };
  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchParameters);

  return data.grouped_hits
    ?.map((suggestion: { group_key: string[] }) => {
      return {
        key: suggestion?.group_key[0][0],
        value: suggestion.group_key[0][0]?.split(" > ")[1],
      };
    })
    .filter((item: { key: string }) => {
      // show only categories from application Ui,
      // remove this when we want to show Ecommerce tags as suggestions
      return item?.key?.split(" > ")[0] === searchCategory[0].label;
    });
};

export const getUIElementsPerTag = async (queryKey: string[]): Promise<SearchResult> => {
  const [filter_by, pageNo, component_pack_name] = queryKey.slice(1);

  const searchByTagsAndCategoryParameters: SearchParams = {
    ...searchByTagsAndCategoryParams,
    page: +pageNo,
  };

  if (filter_by) {
    searchByTagsAndCategoryParameters.filter_by = `component_filter_lvl_0:=${filter_by}`;
  } else {
    searchByTagsAndCategoryParameters.filter_by = `component_pack_tags:=${component_pack_name}`;
  }

  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchByTagsAndCategoryParameters);

  return { componentsList: data?.hits as ComponentData[], totalCount: data?.out_of };
};

export const getCategoriesWithUIElemetsTags = async (queryKey: string[]) => {
  const [facetType] = queryKey.slice(1);
  const searchParameters = {
    ...getFacetsParams,
    // filter_by: "is_ui_element:=true",
    facet_by:
      facetType === "components"
        ? "component_pack_tags,component_filter_lvl_0"
        : "component_pack_tags,sub_category",
  };
  const data = await typesenseClient
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search(searchParameters);
  //   return data;

  const result: componentFacetResult[] = [];

  data?.facet_counts?.[0].counts.forEach((doc) => {
    if (doc.value === searchCategory[0].label || doc.value === searchCategory[1].label) {
      result.push({
        component_pack_name: doc.value,
        count: doc.count,
        components: [],
      });
    }
  });
  data?.facet_counts?.[1].counts.forEach((doc) => {
    const [x1, y1] = doc.value.split(" > ");
    result.forEach((x, index) => {
      if (
        x.component_pack_name === x1 &&
        y1 !== searchCategory[0].label &&
        y1 !== searchCategory[1].label
      ) {
        result[index] = {
          ...result[index],
          components: [
            ...result[index].components,
            {
              component_name: y1,
              count: doc.count,
            },
          ],
        };
      }
    });
  });

  return result;
  //   result.forEach((item) => {
  //     item.components.sort((a, b) => a.component_name.trim().localeCompare(b.component_name.trim()));
  //   });
  //   result.sort((a, b) => {
  //     return a.component_pack_name.trim().localeCompare(b.component_pack_name);
  //   });
};
