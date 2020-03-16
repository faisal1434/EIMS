using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.Models
{
    public enum EducationLevel
    {
        PSC = 1,
        JSC,
        SSC,
        HSC
    }
    public enum SubjectScope
    {
        PSCI=1, //Class 1 to 3
        PSCII, //class 4, 5
        JSC,SSC, HSC
    }
    public enum SubjectGroup
    {
        General=1, Science, Humanities, BusinessStudies
    }
    public enum SubjectType
    {
        Compulsory=1,
        GroupCompulsory,
        GroupSelective,
        GroupCopulsoryOrSelective,
        GroupOptional,
        ExtraCurricular
    }
    public enum ShiftType
    {
        Morning=1,
        Evening,
        Combined
    }
    public enum ClassType
    {
        Theoretical=1, Practical, ExtraCurricular, Break
    }
    public enum RoomType
    {
        ClassRoom=1,
        Lab,
        TeachersRoom,
        CommonRoom,
        MeetingRoom,
        ConferenceRoom,
        OfficeRoom,
        Canteen,
        GameRoom,
        Others
    }
    public enum SessionStatus
    {
        Running=1,Active, Closed
    }
    public enum EmployeeType
    {
        OfficeStaff=1, Faculty
    }
    public enum BloodGroup
    {
        [Description("A+")] Apositive=1,
        [Description("A-")] Anegative,
        [Description("B+")] Bpositive,
        [Description("B-")] Bnegative,
        [Description("AB+")] ABpositive,
        [Description("AB-")] ABnegative,
        [Description("O+")] Opositive,
        [Description("O-")] Onegative
    }
    public enum HolidayType
    {
        PUBLIC = 1, NATIONAL, ACADEMIC, SPECIAL, VACATION
    }
    public enum Gender { Male = 1, Female }
}
