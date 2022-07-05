import moment from 'moment';
import 'moment/locale/nl';
import React from 'react';
import { BsXLg } from 'react-icons/bs';
import './create-salary-plan.scss';

// import { useAppDispatch } from '../../app/hooks';
import { MonthdayPicker } from '../../components/monthday-picker/monthday-picker';
import { RadioButtonGroup } from '../../components/radio-button-group/radio-button-group';
import { RadioButtonComponent } from '../../components/radio-button/iRadioButton';
import { Switch } from '../../components/switch/switch';
import { WorkdayPicker } from '../../components/workday-picker/workday-picker';
import { SalaryPlan, SalaryPlanConfiguration } from './salary-plan';
import { paymentDate } from './paymentDate';

interface properties {
  onClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

export function CreateSalaryPlan(props: properties) {
  // const dispatch = useAppDispatch();
  var oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  // const salaryPlan = new SalaryPlan(config);

  const minStartDate = new Date(Date.now());
  const minEndDate = new Date(Date.now());
  minEndDate.setMonth(minStartDate.getMonth() + 1);

  const paymentDayOptions: RadioButtonComponent[] = [
    { label: 'Eerste dag van de maand', value: paymentDate.FIRSTDAY },
    { label: 'Laatste dag van de maand', value: paymentDate.LASTDAY },
    { label: 'Specifieke dag in de maand', value: paymentDate.SPECIFIC }
  ];

  const [state, setState] = React.useState({
    startDate: Date.now(),
    endDate: oneYearFromNow,
    salaryPaymentDay: paymentDate.LASTDAY,
    salaryOnWorkDays: false,
    specificSalaryPaymentDay: 31,
    specificSalaryFallbackWorkdayRequired: false,
    specificSalaryFallbackWorkday: 3,
    bonusOnWorkDays: false,
    bonusPaymentDay: paymentDate.FIRSTDAY,
    specificBonusPaymentDay: 15,
    specificBonusFallbackWorkdayRequired: false,
    specificBonusFallbackWorkday: 3
  });

  function returnInputValue(target: HTMLInputElement) {
    switch (target.type) {
      case 'date': {
        return moment(target.valueAsDate).format('YYYY-MM-DD');
      }
      case 'checkbox': {
        return target.checked;
      }
      default: {
        return target.value;
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value: boolean | string | Date | null = returnInputValue(event.target);

    setState({
      ...state,

      [event.target.name]: value
    });
  }

  function calculateAndDownload() {
    const config: SalaryPlanConfiguration = {
      name: 'Nieuwe planning',
      startDate: new Date(state.startDate),
      endDate: new Date(state.endDate),
      salaryPaymentDay: state.salaryPaymentDay,
      specificSalaryPaymentDay: state.specificSalaryPaymentDay,
      salaryOnWorkdays: state.salaryOnWorkDays,
      bonusPaymentDay: state.bonusPaymentDay,
      specificSalaryFallbackWorkday: state.specificSalaryFallbackWorkday,
      specificSalaryFallbackWorkdayRequired: state.specificBonusFallbackWorkdayRequired,
      specificBonusPaymentDay: state.specificBonusPaymentDay,
      specificBonusFallbackWorkday: state.specificBonusFallbackWorkday,
      bonusOnWorkdays: state.bonusOnWorkDays,
      specificBonusFallbackWorkdayRequired: state.specificBonusFallbackWorkdayRequired
    };
    const salaryPlan = new SalaryPlan(config);
    salaryPlan.download('Niewe planning');
  }

  return (
    <div className="modal-layout">
      <div className="modal-layout__header">
        <h1 className="modal-layout__header__title">Nieuwe planning</h1>

        <button
          className="modal-layout__header__close"
          onClick={(event) => {
            props.onClose(event);
          }}
          title="dialoog sluiten">
          <BsXLg size={12} />
        </button>
      </div>

      <div className="modal-layout__content">
        <div className="l-create-salary-plan">
          <div className="l-create-salary-plan__scheduler">
            <div className="date-range">
              <label className="date-range__field">
                <span className="date-range__field__label">Van</span>
                <input
                  type="date"
                  className="date-range__field__input"
                  name="startDate"
                  value={moment(state.startDate).format('YYYY-MM-DD')}
                  min={moment(minStartDate).format('YYYY-MM-DD')}
                  onChange={handleChange}
                />
              </label>
              <label className="date-range__field">
                <span className="date-range__field__label">Tot</span>
                <input
                  type="date"
                  className="date-range__field__input"
                  name="endDate"
                  value={moment(state.endDate).format('YYYY-MM-DD')}
                  min={moment(minEndDate).format('YYYY-MM-DD')}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <fieldset className="l-create-salary-plan__segment">
            <h2 className="l-create-salary-plan__segment__title">Salaris</h2>
            <RadioButtonGroup
              label="Dag van salaris betaling"
              name="salaryPaymentDay"
              options={paymentDayOptions}
              value={state.salaryPaymentDay}
              onChange={handleChange}
            />

            {
              // eslint-disable-next-line multiline-ternary
              state.salaryPaymentDay === 'specific' ? (
                <MonthdayPicker
                  name="specificSalaryPaymentDay"
                  onChange={handleChange}
                  value={state.specificSalaryPaymentDay}
                />
              ) : (
                ''
              )
            }
            <Switch
              checked={state.salaryOnWorkDays}
              label="Uitbetalen op werkdagen"
              name="salaryOnWorkDays"
              onChange={handleChange}
            />
            <br />
            <Switch
              checked={state.specificSalaryFallbackWorkdayRequired}
              label="Specifieke terugval dag"
              name="specificSalaryFallbackWorkdayRequired"
              onChange={handleChange}
            />

            {
              // eslint-disable-next-line multiline-ternary
              state.specificSalaryFallbackWorkdayRequired ? (
                <WorkdayPicker
                  name="specificSalaryFallbackWorkday"
                  value={1}
                  onChange={handleChange}
                />
              ) : (
                ''
              )
            }
          </fieldset>

          <fieldset className="l-create-salary-plan__segment">
            <h2 className="l-create-salary-plan__segment__title">Bonus</h2>
            <RadioButtonGroup
              label="Dag van bonus betaling"
              name="bonusPaymentDay"
              options={paymentDayOptions}
              value={state.bonusPaymentDay}
              onChange={handleChange}
            />

            {
              // eslint-disable-next-line multiline-ternary
              state.bonusPaymentDay === 'specific' ? (
                <MonthdayPicker
                  name="specificBonusPaymentDay"
                  onChange={handleChange}
                  value={state.specificBonusPaymentDay}
                />
              ) : (
                ''
              )
            }

            <Switch
              checked={state.bonusOnWorkDays}
              label="Uitbetalen op werkdagen"
              name="bonsusOnWorkDays"
              onChange={handleChange}
            />
            <br />
            <Switch
              checked={state.specificBonusFallbackWorkdayRequired}
              label="Specifieke terugval dag"
              name="specificBonusFallbackWorkdayRequired"
              onChange={handleChange}
            />

            {
              // eslint-disable-next-line multiline-ternary
              state.specificBonusFallbackWorkdayRequired ? (
                <WorkdayPicker
                  name="specificSalaryFallbackWorkday"
                  value={1}
                  onChange={handleChange}
                />
              ) : (
                ''
              )
            }
          </fieldset>
        </div>
      </div>

      <div className="modal-layout__footer">
        <div className="button-bar">
          <button className="button button--primary" onClick={() => calculateAndDownload()}>
            Berekenen en downloaden (.csv)
          </button>
        </div>
      </div>
    </div>
  );
}
