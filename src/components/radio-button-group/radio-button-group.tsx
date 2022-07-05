import React from 'react';
import { RadioButton } from '../radio-button/radio-button';
import { OptionGroupComponent } from './iRadioButtonGroup';
import './radio-button-group.scss';

export class RadioButtonGroup extends React.Component<OptionGroupComponent> {
  public render(): React.ReactNode {
    if (this.props.options) {
      return (
        <fieldset className="radio-button-group">
          <legend className="radio-button-group__label">{this.props.label}</legend>

          {this.props.options.map((option, index) => (
            <RadioButton
              key={index}
              value={option.value}
              name={this.props.name}
              label={option.label}
              checked={this.props.value === option.value}
              onChange={this.props.onChange}
            />
          ))}
        </fieldset>
      );
    }
  }
}
