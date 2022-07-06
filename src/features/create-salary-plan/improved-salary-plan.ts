import { paymentDate } from './paymentDate';
export interface ImprovedSalaryPlanConfiguration {
  startDate: Date;
  endDate: Date;
}

export class ImprovedSalaryPlan {
  private workdays: number[] = [1, 2, 3, 4, 5];
  public startDate: Date;
  public endDate: Date;

  constructor(private configuration: ImprovedSalaryPlanConfiguration) {
    this.startDate = this.configuration.startDate;
    this.endDate = this.configuration.endDate;

    // console.log(this.payoutmonthsDifference(this.startDate, this.endDate));
    // console.log(this.getMonthlyDayBetween(this.startDate, this.endDate, paymentDate.FIRSTDAY));
    // const days = this.getMonthlyDayBetween(this.startDate, this.endDate, paymentDate.LASTDAY, 29);
    // console.log(this.scheduleToWorkDays(days));
  }

  public getMonthlyDayBetween(
    startDate: Date,
    endDate: Date,
    day: paymentDate,
    specificDate?: number
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

  public scheduleToWorkDays(dates: Date[]): Date[] {
    dates.forEach((date) => {
      if (!this.workdays.includes(date.getDay())) {
        date = this.findNextDayFrom(date, this.workdays[0]);
      }
    });

    return dates;
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
