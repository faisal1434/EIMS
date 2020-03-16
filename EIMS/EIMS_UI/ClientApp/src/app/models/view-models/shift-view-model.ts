import { ShiftType } from '../common/constants-model';

export class ShiftViewModel {
  constructor(
    public shiftId?: number,
    public shiftType?: ShiftType,
    public startTime?: Date | string,
    public endTime?: Date | string,
    public active?: boolean
  ) { }
}
