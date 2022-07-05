export interface WorkdayPickerComponent {
  value: number;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
