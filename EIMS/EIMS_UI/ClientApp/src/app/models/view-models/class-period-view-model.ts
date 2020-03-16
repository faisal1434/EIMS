import { ClassType } from '../common/constants-model';

export class ClassPeriodViewModel {
  constructor(
    private classPeriodId?: number,
    private classType?: ClassType,
    private startTime?: Date | string,
    private endTime?: Date | string
  ) { }
}
