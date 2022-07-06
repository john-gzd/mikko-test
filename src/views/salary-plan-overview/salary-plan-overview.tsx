import React from 'react';
import './salary-plan-overview.scss';
import Modal from 'react-modal';
import { BsPlusLg, BsDownload } from 'react-icons/bs';
// import { store } from '../../app/store';
import { CreateSalaryPlan } from '../../features/create-salary-plan/create-salary-plan';
// import { store } from '../../app/store';
// import { SalaryPlanConfiguration } from '../../features/create-salary-plan/salary-plan';
import { paymentDate } from '../../features/create-salary-plan/paymentDate';
import { SalaryPlan, SalaryPlanConfiguration } from '../../features/create-salary-plan/salary-plan';
import moment from 'moment';

export class SalaryPlannerOverviewView extends React.Component {
  state = {
    showModal: false,
    filter: '',
    plans: [
      {
        name: 'IBuildings Mikko test',
        startDate: new Date(2022, 6, 1),
        endDate: new Date(2022, 12, 31),
        salaryPaymentDay: paymentDate.LASTDAY,
        specificSalaryPaymentDay: null,
        salaryOnWorkdays: true,
        bonusPaymentDay: paymentDate.SPECIFIC,
        specificSalaryFallbackWorkday: 1,
        specificSalaryFallbackWorkdayRequired: false,
        specificBonusPaymentDay: 15,
        specificBonusFallbackWorkday: 3,
        bonusOnWorkdays: true,
        specificBonusFallbackWorkdayRequired: true
      }
    ]
  };

  public openModal(
    event: React.MouseEvent<Element, MouseEvent | React.KeyboardEvent<Element>>
  ): void {
    event.preventDefault();
    this.setState({ showModal: true });
  }

  public closeModal = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ): void => {
    event.preventDefault();
    this.setState({ showModal: false });
  };

  public downloadCsv(configuration: SalaryPlanConfiguration): void {
    const salaryPlan = new SalaryPlan(configuration);
    salaryPlan.download(configuration.name);
  }

  public render(): React.ReactNode {
    return (
      <main className="l-salary-plan-overview">
        <div className="l-salary-plan-overview__header">
          <div className="search-header">
            <input
              className="search-header__input"
              type="search"
              placeholder="Bewaarde planning zoeken..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({
                  filter: event.target.value
                });
              }}
            />

            <button
              className="button button--primary search-header__submit"
              onClick={(event) => this.openModal(event)}>
              <BsPlusLg size={12} />
              <span className="button__label">Niew</span>
            </button>
          </div>
        </div>
        <div className="l-salary-plan-overview__content">
          <h1 className="page-title">Bewaarde planningen</h1>

          <div className="salary-plan-list">
            {this.state.plans
              .filter((plan: any) =>
                plan.name.toLowerCase().includes(this.state.filter.toLowerCase())
              )
              .map((plan: SalaryPlanConfiguration, index: number) => (
                <div className="salary-plan-list__item" key={index}>
                  <div className="salary-plan-list__item__name">{plan.name}</div>
                  <div className="salary-plan-list__item__period">
                    {moment(plan.startDate).format('DD-MM-YYYY')} tot
                    {moment(plan.endDate).format('DD-MM-YYYY')}
                  </div>
                  <div className="salary-plan-list__item__download">
                    <button
                      className="button button--download"
                      onClick={() => {
                        this.downloadCsv(plan);
                      }}>
                      <BsDownload size={16} className="button__icon" />
                      <span className="button__label">Download</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Modal
          className="modal"
          overlayClassName="modal-overlay"
          isOpen={this.state.showModal}
          onRequestClose={(event) => this.closeModal(event)}
          contentLabel="Create new salary plan"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}>
          <CreateSalaryPlan onClose={this.closeModal} />
        </Modal>
      </main>
    );
  }
}
