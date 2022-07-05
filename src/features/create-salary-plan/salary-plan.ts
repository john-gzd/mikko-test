import moment from 'moment';

enum paymentDate {
  FIRSTDAY = 'firstDay',
  LASTDAY = 'lastDay',
  SPECIFIC = 'specific'
}

export interface SalaryPlanConfiguration {
  name: string;
  startDate: Date;
  endDate: Date;
  salaryPaymentDay: paymentDate | string;
  salaryOnWorkdays: boolean;
  specificSalaryPaymentDay: number | null;
  specificSalaryFallbackWorkday: number;
  specificSalaryFallbackWorkdayRequired: boolean;
  bonusPaymentDay: paymentDate | string;
  specificBonusPaymentDay: number | null;
  bonusOnWorkdays: boolean;
  specificBonusFallbackWorkdayRequired: boolean;
  specificBonusFallbackWorkday: number;
}

export class SalaryPlan {
  private workdays: number[] = [1, 2, 3, 4, 5];
  public startDate: Date;
  public endDate: Date;
  public salaryPaymentDay: paymentDate | string;
  public specificSalaryPaymentDay: number | null = null;
  public salaryOnWorkDays: boolean = true;
  public specificSalaryFallbackWorkday?: number;
  public specificSalaryFallbackWorkdayRequired: boolean;
  public bonusPaymentDay: paymentDate | string;
  public specificBonusPaymentDay: number | null = null;
  public specificBonusFallbackWorkday?: number | undefined;
  public specificBonusFallbackWorkdayRequired: boolean;
  public bonusOnWorkDays: boolean = true;

  constructor(configuration: SalaryPlanConfiguration) {
    this.startDate = configuration.startDate;
    this.endDate = configuration.endDate;
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

  private fallbackToSpecificWorkday(dates: Date[], day: number): Date[] {
    dates.forEach((date) => {
      if (!this.workdays.includes(date.getDay())) {
        date = this.findNextDayFrom(date, day);
      }
    });

    return dates;
  }

  private getMonthlyDayBetween(
    startDate: Date,
    endDate: Date,
    plannedMoment: string,
    specificDate?: number | null
  ): Date[] {
    const days = [];
    const months = this.getMonthDifference(startDate, endDate);

    for (let i = 0; i < months; i++) {
      switch (plannedMoment) {
        case 'firstDay': {
          days.push(this.getFirstDayOfMonth(startDate.getFullYear(), startDate.getMonth() + i));
          break;
        }
        case 'specific': {
          let paymentDay = this.getLastDayOfMonth(
            startDate.getFullYear(),
            startDate.getMonth() + i
          );

          if (specificDate) {
            paymentDay.setDate(specificDate);

            if (paymentDay.getDate() !== specificDate) {
              paymentDay = this.getLastDayOfMonth(
                startDate.getFullYear(),
                startDate.getMonth() + i
              );
            }
          }

          days.push(paymentDay);
          break;
        }
        default: {
          days.push(this.getLastDayOfMonth(startDate.getFullYear(), startDate.getMonth() + i));
        }
      }
    }

    console.log(days);

    return days;
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

  private scheduleToWorkDays(dates: Date[]): Date[] {
    dates.forEach((date) => {
      if (!this.workdays.includes(date.getDay())) {
        date = this.findNextDayFrom(date, this.workdays[0]);
      }
    });

    return dates;
  }

  private findNextDayFrom(date: Date, day: number) {
    date.setDate(date.getDate() + ((day + 7 - date.getDay()) % 7 || 7));
    return date;
  }

  private getMonthDifference(startDate: Date, endDate: Date) {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  }

  private getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  private getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }
}
