import { HolidayType } from '../common/constants-model';

export class CalendarEventViewModel {
  constructor(
    public id?: number,
    public date?: Date | string,
    public type?: HolidayType,
    public description?: string
  ) { }
}
