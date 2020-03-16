import { EducationLevel } from '../common/constants-model';

export class ClassLevel {
  constructor(
    public classLevelId?: number,
    public educationLevel?: EducationLevel,
    public isRunning?: boolean
  ) { }
}
