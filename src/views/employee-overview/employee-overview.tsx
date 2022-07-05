import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import ReactModal from 'react-modal';
import './employee-overview.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CreateEmployee } from '../../features/employee/create-employee';
import { getEmployees, selectEmployeeList } from '../../features/employee/employee-slice';

export function EmployeeOverviewView() {
  const employees = useAppSelector(selectEmployeeList);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!employees.length) {
      dispatch(getEmployees());
    }
  }, []);

  function openModal(
    event: React.MouseEvent<Element, MouseEvent | React.KeyboardEvent<Element>>
  ): void {
    event.preventDefault();
    setShowModal(true);
  }

  function closeModal(
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ): void {
    event.preventDefault();
    setShowModal(false);
  }

  return (
    <main className="l-employee-overview">
      <div className="l-employee-overview__header">
        <div className="search-header">
          <input
            className="search-header__input"
            type="search"
            placeholder="Medewerker zoeken..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}
          />
          <button
            className="button button--primary search-header__submit"
            onClick={(event) => openModal(event)}>
            <BsPlusLg size={12} />
            <span className="button__label">Niew</span>
          </button>
        </div>
      </div>
      <div className="l-employee-overview__content">
        <h1 className="page-title">Medwerker overzicht ({employees.length})</h1>

        <div className="employee-list">
          {employees
            .filter(
              (employees: any) =>
                employees.name.first.toLowerCase().includes(filter.toLowerCase()) ||
                employees.name.last.toLowerCase().includes(filter.toLowerCase())
            )
            .map((employee: any, index: number) => (
              <div key={index} className="employee-list__item">
                <div className="employee-list__item__avatar">
                  <img
                    className="employee-list__item__avatar__image"
                    src={employee.picture.thumbnail}
                  />
                </div>
                <div className="employee-list__item__names">
                  {employee.name.first} {employee.name.last}
                </div>
                <div className="employee-list__item__function">Verkoper</div>
              </div>
            ))}
        </div>
      </div>
      <ReactModal
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={showModal}
        onRequestClose={(event) => closeModal(event)}
        contentLabel="Create new employee"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}>
        <CreateEmployee onClose={closeModal} />
      </ReactModal>
    </main>
  );
}
