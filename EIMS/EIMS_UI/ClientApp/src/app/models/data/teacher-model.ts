import { Employee } from './employee-model';
import { EmployeeType, Gender, EducationLevel } from '../common/constants-model';
import { SubjectGroup } from '../common/contants-model';


export class Teacher extends Employee {
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
        designationId)  }
}
