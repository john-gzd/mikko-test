import React from 'react';
import { NavLink } from 'react-router-dom';
import { TabComponent } from '../tab/iTabInterface';
import './tab.scss';

export class EmployeeListItem extends React.Component<TabComponent> {
  public render(): React.ReactNode {
    return (
      <NavLink className="tab" to={this.props.route}>
        <div className="tab__label">{this.props.label}</div>
        <div className="tab__decorator"></div>
      </NavLink>
    );
  }
}
