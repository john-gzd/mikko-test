import React from 'react';
import './create-employee-modal.scss';
import { BsX } from 'react-icons/bs';

interface properties {
  onClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

export class CreateEmployeeModal extends React.Component<properties> {
  public render(): React.ReactNode {
    return (
      <div className="modal-layout">
        <div className="modal-layout__header">
          <h1>Create Employee</h1>

          <button
            onClick={(event) => {
              this.props.onClose(event);
            }}>
            <BsX />
          </button>
        </div>

        <div className="modal-layout__content">
          <div className="form-field">
            <label className="form-field__label" htmlFor="firstname">
              First name:
            </label>
            <input className="form-field__input" type="text" name="lastname" id="firstname" />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="lastname">
              Last name:
            </label>
            <input className="form-field__input" type="text" name="lastname" id="lastname" />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="function">
              Function:
            </label>
            <input className="form-field__input" type="text" name="function" id="function" />
          </div>

          <div className="form-field form-field--checkbox">
            <input className="form-field__input" type="checkbox" name="name" id="bonus" />
            <label className="form-field__label" htmlFor="bonus">
              Bonus:
            </label>
          </div>
        </div>

        <div className="modal-layout__footer">
          <div className="button-bar">
            <button className="button button--primary">Save</button>
            <button className="button button--link">Download as .csv</button>
          </div>
        </div>
      </div>
    );
  }
}
