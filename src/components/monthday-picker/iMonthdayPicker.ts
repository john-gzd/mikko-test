export interface MonthdayPickerComponent {
  value: number;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
