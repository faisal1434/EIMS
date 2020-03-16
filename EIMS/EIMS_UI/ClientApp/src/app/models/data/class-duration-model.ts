import { ClassType } from '../common/constants-model';

export class ClassDuration {
  constructor(
    public classDurationId?: number,
    public classType?: ClassType,
    public duration?: number
  ) { }
}
