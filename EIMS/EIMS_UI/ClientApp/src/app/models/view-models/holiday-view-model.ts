import { HolidayType } from '../common/constants-model';

export class HolidayViewModel {
  constructor(
    public holidayId?: number,
    public holidayDate?: string,
    public holidayType?: HolidayType,
    public upto?: Date | string,
    public description?: string
  ) { }
}
