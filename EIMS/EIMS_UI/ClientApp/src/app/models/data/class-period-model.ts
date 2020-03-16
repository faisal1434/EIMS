import { ClassType } from '../common/constants-model';
import { Time } from '@angular/common';

export class ClassPeriod {
  constructor(
    private classPeriodId?: number,
    private classType?: ClassType,
    private startTime?: Time | string,
    private endTime?: Time | string
  ) { }
}
