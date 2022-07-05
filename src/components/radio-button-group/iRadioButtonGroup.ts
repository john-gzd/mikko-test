import { RadioButtonComponent } from '../radio-button/iRadioButton';

export interface OptionGroupComponent {
  name: string;
  label: string;
  value?: string;
  options?: RadioButtonComponent[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
