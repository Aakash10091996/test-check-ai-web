export type MixPanelData = {
  id?: string;
  $email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export interface ApiResponse {
  isBlocked: boolean;
  ipTocheck: string;
  blockedIpsString: string;
}
