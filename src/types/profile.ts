export interface Subscription {
  subscription_type: string;
  pricing_plan: string;
  price: string;
  theming_supported: boolean;
  total_component_generation_credits: number;
  total_image_to_code_generation_credits: number;
}

export interface ProfileDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  system_role: string;
  user_status: string;
  created_at: string;
  updated_at: string;
  auth_type?: string;
  activeSubscription?: Subscription;
  canceledSubscription?: Subscription;
  components_generated_with_theme: number;
}
