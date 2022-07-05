import React from 'react';
import { BsX } from 'react-icons/bs';

interface properties {
  onClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

export function CreateEmployee(props: properties) {
  return (
    <div className="modal-layout">
      <div className="modal-layout__header">
        <h1 className="modal-layout__header__title">Create Employee</h1>

        <button
          className="modal-layout__header__close"
          onClick={(event) => {
            props.onClose(event);
          }}
          title="dialoog sluiten">
          <BsX />
        </button>
      </div>

      <div className="modal-layout__content">
        <b>Dit formulier is nog onder constructie</b>
      </div>
    </div>
  );
}
