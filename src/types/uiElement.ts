import type { Dispatch, SetStateAction } from "react";

export interface CategoryItem {
  id: string;
  category: string;
}

type CodeSnippet = Record<string, string>;

export interface ElementDetails {
  id: string;
  name: string;
  dsl_url: string;
  theme_url: string;
  dslImageUrl: string;
  rating: string;
  is_ui_element: boolean;
  created_at: string;
  updated_at: string;
  category: string;
  cp_name: string;
  cp_id: string;
  lg_code: CodeSnippet;
  mui_lg_code: CodeSnippet;
  tw_lg_code: CodeSnippet;
  global_theme_url: string;
}

export interface CommonSidebarProps {
  fromDrawer?: boolean;
  setShowHideSidebar?: (status: boolean) => void;
}

export interface CommonSidebarShowProps {
  showHideSidebar?: boolean;
  setShowHideSidebar?: Dispatch<SetStateAction<boolean>>;
}

export interface RefObject<T> {
  current: T | null;
}
