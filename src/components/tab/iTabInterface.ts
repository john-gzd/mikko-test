import { IconType } from 'react-icons/lib/esm/iconBase';

export interface TabComponent {
  icon?: IconType;
  label: string;
  route: string;
}
