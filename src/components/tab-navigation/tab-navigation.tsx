import React from 'react';
import { TabComponent } from '../tab/iTabInterface';
import { Tab } from '../tab/tab';
import './tab-navigation.scss';

interface properties {
  tabs: TabComponent[];
}

export class TabNavigation extends React.Component<properties> {
  public render(): React.ReactNode {
    return (
      <nav className="tab-navigation">
        {this.props.tabs.map((tab, index) => {
          return <Tab key={index} route={tab.route} label={tab.label} />;
        })}
      </nav>
    );
  }
}
