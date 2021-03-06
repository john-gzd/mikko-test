import { ImprovedSalaryPlan, ImprovedSalaryPlanConfiguration } from './improved-salary-plan';
import { paymentDate } from './paymentDate';

describe('Salary Plan', () => {
  let configuration: ImprovedSalaryPlanConfiguration;
  let salaryPlan: ImprovedSalaryPlan;

  beforeEach(() => {
    configuration = {
      name: 'test plan',
      startDate: new Date(Date.now()),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
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
    };
    salaryPlan = new ImprovedSalaryPlan(configuration);
  });

  it('should have a start date', () => {
    expect(salaryPlan.startDate).not.toBeUndefined();
  });

  it('should have a end date', () => {
    expect(salaryPlan.startDate).not.toBeUndefined();
  });

  it('should return months betweeen, with one extra because of payouts', () => {
    expect(salaryPlan.payoutmonthsDifference(salaryPlan.startDate, salaryPlan.endDate)).toBe(12);
  });

  it('should return the first day of the month', () => {
    expect(salaryPlan.getFirstDayOfMonth(2022, 1).getDate()).toBe(1);
  });

  it('should return the last day of the month', () => {
    expect(salaryPlan.getLastDayOfMonth(2022, 1).getDate()).toBe(28);
  });

  it('should the next opcomming weekday by number', () => {
    // Arange
    const date = new Date(2022, 6, 9);
    const wantedDay = new Date(2022, 6, 13).getDay();

    // Act
    const calculatedDay = salaryPlan.findNextDayFrom(date, 3).getDay();

    // Assert
    expect(calculatedDay).toBe(wantedDay);
  });

  it('should schedule to workdays', () => {
    // Arange
    const dates = [new Date(2022, 6, 2), new Date(2022, 6, 9), new Date(2022, 6, 16)];

    // Act
    const workdays = salaryPlan.scheduleToWorkDays(dates);

    // Assert
    workdays.forEach((day) => {
      expect(day.getDay()).not.toBe(6);
      expect(day.getDay()).not.toBe(0);
    });
  });

  it('should schedule weekenddays to wednesday', () => {
    // Arange
    const dates = [new Date(2022, 6, 2), new Date(2022, 6, 9), new Date(2022, 6, 16)];

    // Act
    const workdays = salaryPlan.fallbackToSpecificWorkday(dates, 3);

    // Assert
    workdays.forEach((day) => {
      expect(day.getDay()).toBe(3);
    });
  });
});
