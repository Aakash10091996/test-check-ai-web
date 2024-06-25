export interface FilterOptionsForCategorySearch {
  filter_by: string;
  pageNo: number;
  // component_pack_name: string;
}

export interface SearchResult {
  componentsList: ComponentData[] | undefined;
  totalCount: number;
}

export interface componentFacetResult {
  component_pack_name: string;
  count: number;
  components: { component_name: string; count: number }[];
}

export interface ComponentAnalyticsData {
  component_id: string;
  component_name: string;
  component_pack_id: string;
  component_pack_name: string;
  component_pack_tags: string[];
  component_tags: string[];
  dsl: string;
  id?: string;
  framework_select?: number;
}

export interface MarketplaceProjectsResult {
  group_key: string[];
  hits: { document: ComponentAnalyticsData }[];
  found?: number | undefined;
}

export interface ComponentData {
  document: ComponentAnalyticsData;
}
