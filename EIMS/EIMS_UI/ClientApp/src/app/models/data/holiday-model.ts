import { HolidayType } from '../common/constants-model';

export class Holiday {
  constructor(
    public holidayId?: number,
    public holidayDate?: Date | string,
    public holidayType?: HolidayType,
    public duration?: number,
    public description?: string
  ) { }
}
