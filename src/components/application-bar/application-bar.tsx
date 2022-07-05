import React from 'react';
import './application-bar.scss';

export class ApplicationBar extends React.Component {
  public render(): React.ReactNode {
    return (
      <div className="application-bar">
        <span className="application-bar__name">PayDay</span>
        <img
          className="application-bar__avatar"
          src="https://randomuser.me/api/portraits/women/33.jpg"
        />
      </div>
    );
  }
}
