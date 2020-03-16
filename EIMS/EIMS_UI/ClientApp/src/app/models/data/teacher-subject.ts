import { Employee } from './employee-model';
import { Subject } from './subject-model';

export class TeacherSubject {
  constructor(
    public teacherSubjectId?: number,
    public employeeId?: number,
    public subjectId?: number,
    public employee?: Employee,
    public subject?: Subject
  ) { }
}
