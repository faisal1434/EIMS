import { EmployeeType, BloodGroup } from '../common/constants-model';

export class Employee {
  constructor(
    public employeeId?: number,
    public employeeName?: string,
    public employeeType?: EmployeeType, //-
    public phone?: string,
    public email?: string,
    public presentAddress?: string,
    public permanentAddress?: string,
    public joinDate?: Date | string,
    public picture?: string,
    public fingerprint?: string,
    public designationId?: number
  ) { }
}
