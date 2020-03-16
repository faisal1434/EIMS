export interface NavItem {
  label: string;
  disabled?: boolean;
  icon: string;
  link?: string;
  items?: NavItem[];
}
