import { SessionStatus } from '../common/constants-model';

export class AcademicSession {
  constructor(
    public academicSessionId?: number,
    public sessionName?: string,
    public startDate?: Date | string,
    public endDate?: string,
    public sessionStatus?: SessionStatus
  ) { }
}
