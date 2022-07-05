export interface SwitchComponent {
  checked: boolean;
  label: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
