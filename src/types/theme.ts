export interface ThemeProps {
  radius: string;
  shadow: string;
  font: string;
  sizing: string;
  primary: string;
  secondary: string;
  base: string;
  neutral: string;
  "data-theme": string;
}

export interface AiThemePayload {
  theme: ThemeProps | string | null;
  type: "upload" | "pc_theme";
  theme_id?: string;
  theme_name?: string;
}

export interface Theme {
  id: string;
  name: string;
  theme_json: ThemeProps;
  theme_upload?: string;
  created_at: string;
  updated_at: string;
}

export interface ThemePayload {
  name?: string;
  theme_json?: ThemeProps | string;
  theme_upload?: string;
}

export interface UpdateThemePayload {
  id: string;
  data: ThemePayload;
}

export interface CreateThemePayload {
  name?: string;
  theme_json?: ThemeProps | string;
  theme_upload?: string;
}

export interface COLORS {
  primary: string;
  secondary: string;
  base: string;
  neutral: string;
}
