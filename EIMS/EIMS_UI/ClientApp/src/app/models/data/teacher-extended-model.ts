import { EducationLevel, SubjectGroup, Gender, EmployeeType } from '../common/constants-model';
import { Qualification } from './qualification-model';
import { inherits } from 'util';
import { Employee } from './employee-model';

export class TeacherExtended extends Employee {
  employeeType: EmployeeType = EmployeeType.Faculty;
  constructor(
    public employeeId?: number,
    public employeeName?: string,
    public phone?: string,
    public email?: string,
    public presentAddress?: string,
    public permanentAddress?: string,
    public joinDate?: Date | string,
    public picture?: string,
    public fingerprint?: string,
    public designationId?: number,
    public gender?: Gender, //+
    public classLevel?: EducationLevel,
    public subjectGroup?: SubjectGroup,
    public qualifications?: Qualification[]
  ) {
    super(
      employeeId, employeeName,
      EmployeeType.Faculty,
      phone, email,
      presentAddress,
      permanentAddress,
      joinDate,
      picture,
      fingerprint,
      designationId)
  }
}
