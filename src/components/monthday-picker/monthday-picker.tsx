import React from 'react';
import { MonthdayPickerComponent } from './iMonthdayPicker';
import './monthday-picker.scss';

export class MonthdayPicker extends React.Component<MonthdayPickerComponent> {
  monthLength = 31;
  monthDays = this.getMonthDays();
  state = {
    value: 1
  };

  constructor(props: MonthdayPickerComponent) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  getMonthDays(): number[] {
    const monthDays: number[] = Array.from(Array(this.monthLength + 1).keys());
    monthDays.shift();
    return monthDays;
  }

  setValue(selectedValue: number): void {
    this.setState({
      value: selectedValue
    });

    const element = document.getElementById(this.props.name);
    if (element) {
      var event = new Event('input', { bubbles: true });
      element.dispatchEvent(event);
    }
  }

  public render(): React.ReactNode {
    if (this.monthDays) {
      return (
        <div className="monthday-picker">
          {this.monthDays.map((day, index) => (
            <div
              className={
                this.state.value === day ? 'monthday-picker__day is-active' : 'monthday-picker__day'
              }
              onClick={() => this.setValue(day)}
              key={index}>
              {day}
            </div>
          ))}
          <input
            type="hidden"
            value={this.state.value}
            name={this.props.name}
            id={this.props.name}
            onInput={this.props.onChange}
          />
        </div>
      );
    }
  }
}
