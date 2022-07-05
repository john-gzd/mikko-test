export interface RadioButtonComponent {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
