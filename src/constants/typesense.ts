export const searchQueryParams = {
  // q: searchTerm,
  query_by:
    "component_filter,component_filter_lvl_0,component_filter_lvl_1,component_filter_lvl_2,component_filter_lvl_3,component_filter_lvl_4,embedding",
  exclude_fields:
    "embedding,raw_component_lg_code,raw_component_mui_lg_code,raw_component_tw_lg_code",
  group_by: "component_filter_lvl_0",
  group_limit: 1,
  per_page: 20,
};

export const searchByTagsAndCategoryParams = {
  q: "*",
  query_by:
    "component_filter_lvl_0,component_filter_lvl_0,component_filter_lvl_1,component_filter_lvl_3,component_filter_lvl_4,embedding",
  exclude_fields: "embedding",
  facet_by: "component_pack_tags,component_filter",
  sort_by: "_eval(is_important:true):desc,_text_match:desc,rating:desc",
  per_page: 5,
  // page: +pageNo,
};

export const getFacetsParams = {
  q: "*",
  query_by: "embedding",
  exclude_fields:
    "embedding,raw_component_lg_code,raw_component_mui_lg_code,raw_component_tw_lg_code",
  max_facet_values: 200,
};

export const getComponentPackDataParams = {
  q: "*",
  query_by: "embedding",
  exclude_fields: [
    "embedding",
    "raw_component_lg_code",
    "raw_component_mui_lg_code",
    "raw_component_tw_lg_code",
  ],
  group_by: "component_pack_name",
  per_page: 250,
  group_limit: 6,
};
