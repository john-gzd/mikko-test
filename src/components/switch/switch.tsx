import React from 'react';
import { SwitchComponent } from './iSwitchInterface';
import './switch.scss';

export class Switch extends React.Component<SwitchComponent> {
  public render(): React.ReactNode {
    return (
      <label className="switch">
        <input
          className="switch__checkbox"
          name={this.props.name}
          type="checkbox"
          defaultChecked={this.props.checked}
          onChange={this.props.onChange}
        />
        <div className="switch__toggle"></div>
        <span className="switch__label">{this.props.label}</span>
      </label>
    );
  }
}
