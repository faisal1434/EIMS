import { SubjectGroup } from '../common/contants-model';
import { AcademicClass } from './academic-class-model';

export class Section {
  constructor(
    public sectionId?: number,
    public sectionName?: string,
    public subjectGroup?: SubjectGroup,
    public academicClassId?: number,
    public academicClass?: AcademicClass
  ) { }
}
