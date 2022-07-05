import React from 'react';
import { RadioButtonComponent } from './iRadioButton';
import './radio-button.scss';

export class RadioButton extends React.Component<RadioButtonComponent> {
  public render(): React.ReactNode {
    return (
      <label className="radio-button">
        <input
          className="radio-button__input"
          type="radio"
          id="firstDay"
          name={this.props.name}
          value={this.props.value}
          defaultChecked={this.props.checked}
          onChange={this.props.onChange}
        />
        <div className="radio-button__button">{this.props.label}</div>
      </label>
    );
  }
}
