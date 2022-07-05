import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TabNavigation } from './components/tab-navigation/tab-navigation';
import './App.scss';
import { TabComponent } from './components/tab/iTabInterface';
import { EmployeeOverviewView } from './views/employee-overview/employee-overview';
import { SalaryPlannerOverviewView } from './views/salary-plan-overview/salary-plan-overview';
import { ApplicationBar } from './components/application-bar/application-bar';

function App() {
  const navigationTabs: TabComponent[] = [
    { label: 'Salaris planning', route: '/' },
    { label: 'Medewerkers', route: 'employees' }
  ];

  return (
    <>
      <div className="application">
        <header className="application__header">
          <ApplicationBar />

          <div className="application__header__navigation">
            <TabNavigation tabs={navigationTabs}></TabNavigation>
          </div>
        </header>
        <div className="application__content">
          <Routes>
            <Route path="/" element={<SalaryPlannerOverviewView />} />
            <Route path="employees" element={<EmployeeOverviewView />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
