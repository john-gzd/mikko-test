import moment from 'moment';
import { paymentDate } from './paymentDate';
export interface ImprovedSalaryPlanConfiguration {
  name: string;
  startDate: Date;
  endDate: Date;
  salaryPaymentDay: paymentDate;
  salaryOnWorkdays: boolean;
  specificSalaryPaymentDay: number | null;
  specificSalaryFallbackWorkday: number;
  specificSalaryFallbackWorkdayRequired: boolean;
  bonusPaymentDay: paymentDate;
  specificBonusPaymentDay: number | null;
  bonusOnWorkdays: boolean;
  specificBonusFallbackWorkdayRequired: boolean;
  specificBonusFallbackWorkday: number;
}

export class ImprovedSalaryPlan {
  public name: string = '';
  private workdays: number[] = [1, 2, 3, 4, 5];
  public startDate: Date;
  public endDate: Date;
  public salaryPaymentDay: paymentDate;
  public specificSalaryPaymentDay: number | null = null;
  public salaryOnWorkDays: boolean = true;
  public specificSalaryFallbackWorkday?: number;
  public specificSalaryFallbackWorkdayRequired: boolean;
  public bonusPaymentDay: paymentDate;
  public specificBonusPaymentDay: number | null = null;
  public specificBonusFallbackWorkday?: number | undefined;
  public specificBonusFallbackWorkdayRequired: boolean;
  public bonusOnWorkDays: boolean = true;

  constructor(private configuration: ImprovedSalaryPlanConfiguration) {
    this.startDate = this.configuration.startDate;
    this.endDate = this.configuration.endDate;
    this.salaryPaymentDay = configuration.salaryPaymentDay;
    this.specificSalaryPaymentDay = configuration.specificBonusPaymentDay;
    this.specificSalaryFallbackWorkday = configuration.specificBonusFallbackWorkday;
    this.specificSalaryFallbackWorkdayRequired =
      configuration.specificSalaryFallbackWorkdayRequired;
    this.bonusPaymentDay = configuration.bonusPaymentDay;
    this.specificBonusPaymentDay = configuration.specificBonusPaymentDay;
    this.specificBonusFallbackWorkdayRequired = configuration.specificBonusFallbackWorkdayRequired;
    this.specificBonusFallbackWorkday = configuration.specificBonusFallbackWorkday;
  }

  public salaryDays(): Date[] {
    let salaryDays = this.getMonthlyDayBetween(
      this.startDate,
      this.endDate,
      this.salaryPaymentDay,
      this.specificSalaryPaymentDay
    );

    if (this.specificSalaryFallbackWorkdayRequired && this.specificSalaryFallbackWorkday) {
      salaryDays = this.fallbackToSpecificWorkday(salaryDays, this.specificSalaryFallbackWorkday);
    }

    if (this.salaryOnWorkDays) {
      salaryDays = this.scheduleToWorkDays(salaryDays);
    }

    return salaryDays;
  }

  public bonusDays(): Date[] {
    let bonusDays = this.getMonthlyDayBetween(
      this.startDate,
      this.endDate,
      this.bonusPaymentDay,
      this.specificBonusPaymentDay
    );

    if (this.specificBonusFallbackWorkday) {
      bonusDays = this.fallbackToSpecificWorkday(bonusDays, this.specificBonusFallbackWorkday);
    }

    if (this.bonusOnWorkDays && !this.specificBonusFallbackWorkday) {
      bonusDays = this.scheduleToWorkDays(bonusDays);
    }

    return bonusDays;
  }

  public getMonthlyDayBetween(
    startDate: Date,
    endDate: Date,
    day: paymentDate,
    specificDate?: number | null
  ): Date[] {
    const days = [];
    const months = this.payoutmonthsDifference(startDate, endDate);

    for (let i = 0; i < months; i++) {
      switch (day) {
        case paymentDate.FIRSTDAY: {
          const selectedDay = this.getFirstDayOfMonth(
            startDate.getFullYear(),
            startDate.getMonth() + i
          );

          days.push(selectedDay);
          break;
        }
        case paymentDate.SPECIFIC: {
          let selectedDay = this.getLastDayOfMonth(
            startDate.getFullYear(),
            startDate.getMonth() + i
          );
          if (specificDate) {
            selectedDay.setDate(specificDate);

            if (selectedDay.getDate() !== specificDate) {
              selectedDay = this.getLastDayOfMonth(
                startDate.getFullYear(),
                startDate.getMonth() + i
              );
            }
          }
          days.push(selectedDay);
          break;
        }
        default: {
          const selectedDay = this.getLastDayOfMonth(
            startDate.getFullYear(),
            startDate.getMonth() + i
          );

          days.push(selectedDay);
        }
      }
    }

    return days;
  }

  public fallbackToSpecificWorkday(dates: Date[], day: number): Date[] {
    dates.forEach((date) => {
      if (!this.workdays.includes(date.getDay())) {
        date = this.findNextDayFrom(date, day);
      }
    });

    return dates;
  }

  public scheduleToWorkDays(dates: Date[]): Date[] {
    dates.forEach((date) => {
      if (!this.workdays.includes(date.getDay())) {
        date = this.findNextDayFrom(date, this.workdays[0]);
      }
    });

    return dates;
  }

  public download(name: string): void {
    var link = document.createElement('a');
    link.setAttribute('href', this.csv());
    link.setAttribute('download', `${name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private csv(): string {
    const salaryDates = this.salaryDays();
    const bonusDates = this.bonusDays();
    const rows: any = [['Uitbetaling salaris', 'Uitbetaling bonus']];

    for (let i = 0; i < salaryDates.length; i++) {
      rows.push([
        moment(salaryDates[i]).locale('nl').format('dddd DD-MM-YYYY'),
        moment(bonusDates[i]).locale('nl').format('dddd DD-MM-YYYY')
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e: String[]) => e.join(',')).join('\n');

    return encodeURI(csvContent);
  }

  public findNextDayFrom(date: Date, day: number) {
    date.setDate(date.getDate() + ((day + 7 - date.getDay()) % 7 || 7));
    return date;
  }

  public payoutmonthsDifference(startDate: Date, endDate: Date): number {
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
  }

  public getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  public getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }
}
