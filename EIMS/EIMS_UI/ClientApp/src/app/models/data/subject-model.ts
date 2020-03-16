import { SubjectScope, SubjectGroup, SubjectType } from '../common/constants-model';

export class Subject {
  constructor(
    public subjectId?: number,
    public subjectName?: string,
    public subjectCode?: string,
    public classLevelId?: number,
    public subjectScope?: SubjectScope,
    public subjectGroup?: SubjectGroup,
    public subjectType?: SubjectType
  ) {
   
  }
}
