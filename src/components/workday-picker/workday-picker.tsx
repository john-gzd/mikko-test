import React from 'react';
import { WorkdayPickerComponent } from './iWorkdayPicker';
import './workday-picker.scss';

export class WorkdayPicker extends React.Component<WorkdayPickerComponent> {
  daysNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woendag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  weekLength = 5;
  workdays = this.getWorkdays();
  state = {
    value: 1
  };

  constructor(props: WorkdayPickerComponent) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  getWorkdays(): number[] {
    const monthDays: number[] = Array.from(Array(this.weekLength + 1).keys());
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
    if (this.workdays) {
      return (
        <div className="workday-picker">
          {this.workdays.map((day, index) => (
            <div
              className={
                this.state.value === day ? 'workday-picker__day is-active' : 'workday-picker__day'
              }
              onClick={() => this.setValue(day)}
              key={index}>
              {this.daysNames[day].substring(0, 2)}
            </div>
          ))}
          <input
            className="workday-picker__input"
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
