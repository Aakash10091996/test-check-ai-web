export interface MarketplaceComponent {
  id: string;
  name: string;
  dsl_url: string;
  theme_url: string;
  is_free: boolean;
  lg_code?: string | null;
  mui_lg_code?: string | null;
  tw_lg_code?: string | null;
  component_tags: string[];
}

export interface MarketplaceProject {
  id: string;
  name: string;
  theme_url: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  components: MarketplaceComponent[];
}
