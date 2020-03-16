import { Gender, BloodGroup } from '../common/constants-model';

export class Student {
  constructor(
    public studentId?: number,
    public studentName?: string,
    public roll?: string,
    public gender?: Gender,
    public birthDate?: Date | string,
    public bloodGroup?: BloodGroup,
    public fatherName?: string,
    public motherName?: string,
    public phone?: string,
    public email?: string,
    public address?: string,
    public picture?: string,
    public fingerprint?: string,
    public sectionId?: number
  ) { }
}
