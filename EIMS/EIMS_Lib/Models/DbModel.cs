using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using EIMS_Lib.Models;

namespace EIMS_Lib.Models
{
    public class BusinessDay
    {
        public int BusinessDayId { get; set; }
        [Required, EnumDataType(typeof(DayOfWeek))]
        public DayOfWeek Weekday { get; set; }
        [Required]
        public bool IsOn { get; set; }
    }
    public class ClassDuration
    {
        public int ClassDurationId { get; set; }
        [Required, EnumDataType(typeof(ClassType))]
        public ClassType ClassType { get; set; }
        [Required]
        public int Duration { get; set; }
    }
    public class Shift
    {
        public Shift()
        {
            this.ClassPeriods = new List<ClassPeriod>();
            this.AcademicClasses = new List<AcademicClass>();
        }
        public int ShiftId { get; set; }
        [Required, EnumDataType(typeof(ShiftType))]
        public ShiftType ShiftType { get; set; }
        [Required, Column(TypeName ="time")]
        public TimeSpan StartTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan EndTime { get; set; }
        [Required]
        public bool Active { get; set; }
        public virtual ICollection<ClassPeriod> ClassPeriods { get; set; }
        public virtual ICollection<AcademicClass> AcademicClasses { get; set; }
    }
    public class ClassPeriod
    {
        public int ClassPeriodId { get; set; }
        [Required, ForeignKey("Shift")]
        public int ShiftId { get; set; }
        [Required,EnumDataType(typeof(ClassType))]
        public ClassType ClassType { get; set; }
        [Required,Column(TypeName ="time")]
        public TimeSpan StartTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan EndTime { get; set; }
        public virtual Shift Shift { get; set; }
    }
    public class Holiday
    {
        public int HolidayId { get; set; }
        [Required, Column(TypeName = "date"),
        Display(Name = "Holiday Date"),
        DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}",
        ApplyFormatInEditMode = true)]
        public DateTime HolidayDate { get; set; }
        [Required, EnumDataType(typeof(HolidayType))]
        public HolidayType HolidayType { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required, StringLength(100)]
        public string Description { get; set; }
    }
    public class Room
    {
        public int RoomId { get; set; }
        [Required, EnumDataType(typeof(RoomType))]
        public RoomType RoomType { get; set; }
        [Required, StringLength(20)]
        public string RoomNo { get; set; }
        public int Capacity { get; set; }

    }
    public class InstituteInfo
    {
        public int InstituteInfoId { get; set; }
        [Required, Display(Name = "Institute Name")]
        public string InstituteName { get; set; }
        [Required, Column(TypeName = "date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Established { get; set; }
        [Required, Display(Name = "Slogan")]
        public string InstituteSlogan { get; set; }
        [Required, StringLength(100), Display(Name = "Principal Name")]
        public string PrincipalName { get; set; }
        [Required, StringLength(40), Display(Name = "Founder Name")]
        public string FounderName { get; set; }
        [Required, Display(Name = "Phone No"), StringLength(20)]
        public string Phone { get; set; }
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required, StringLength(250)]
        public string Address { get; set; }
        [Required, StringLength(1000)]
        public string Description { get; set; }
    }
    public class AcademicSession
    {
        public AcademicSession()
        {
            this.AcademicClasses = new List<AcademicClass>();
        }
        public int AcademicSessionId { get; set; }
        [Required, StringLength(20)]
        public string SessionName { get; set; }
        [Required, Column(TypeName="date")]
        public DateTime StartDate { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime EndDate { get; set; }
        [Required, EnumDataType(typeof(SessionStatus))]
        public SessionStatus  SessionStatus{ get; set; }
        public virtual ICollection<AcademicClass> AcademicClasses { get; set; }
    }
    public class ClassLevel
    {
        public ClassLevel()
        {
            this.AcademicClasses = new List<AcademicClass>();
            this.Subjects = new List<Subject>();
        }
        public int ClassLevelId { get; set; }
        [Required, EnumDataType(typeof(EducationLevel))]
        public EducationLevel EducationLevel { get; set; }
        [Required]
        public bool IsRunning { get; set; }
        public virtual ICollection<AcademicClass> AcademicClasses { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
    }
    public class AcademicClass
    {
        public AcademicClass()
        {
            this.Sections = new List<Section>();
        }
        public int AcademicClassId { get; set; }
        [Required, StringLength(30)]
        public string ClassName { get; set; }
        [Required,ForeignKey("AcademicSession")]
        public int AcademicSessionId { get; set; }
        [Required, ForeignKey("ClassLevel")]
        public int ClassLevelId { get; set; }
        [Required, ForeignKey("Shift")]
        public int ShiftId { get; set; }
        public virtual ClassLevel ClassLevel { get; set; }
        public virtual AcademicSession AcademicSession { get; set; }
        public virtual Shift Shift { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
    public class Section
    {
        public Section()
        {
            this.Students = new List<Student>();
        }
        public int SectionId { get; set; }
        [Required, StringLength(40)]
        public string SectionName { get; set; }
        [Required, EnumDataType(typeof(SubjectGroup))]
        public SubjectGroup SubjectGroup { get; set; }
        [Required,ForeignKey("AcademicClass")]
        public int AcademicClassId { get; set; }
        public virtual AcademicClass AcademicClass { get; set; }
        public virtual ICollection<Student> Students { get; set; }
    }
    public class Student
    {
        public Student()
        {
            this.StudentAttendances = new List<StudentAttendance>();
        }
        public int StudentId { get; set; }
        [Required, Display(Name = "Student Name"), StringLength(50)]
        public string StudentName { get; set; }
        [Required, Display(Name = "Roll No"), StringLength(15)]
        public string Roll { get; set; }
        [Required, EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }
        [Required, EnumDataType(typeof(BloodGroup))]
        public BloodGroup BloodGroup { get; set; }
        [Required, Column(TypeName ="date")]
        public DateTime BirthDate { get; set; }
        [Required, Display(Name = "Father Name"), StringLength(50)]
        public string FatherName { get; set; }
        [Required, Display(Name = "Mother Name"), StringLength(50)]
        public string MotherName { get; set; }
        [Required, Display(Name = "Phone No"), StringLength(20)]
        public string Phone { get; set; }
        [Required, StringLength(50), DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required, StringLength(250)]
        public string Address { get; set; }
        
        [StringLength(250)]
        public string Picture { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Fingerprint { get; set; }
        [Required, ForeignKey("Section")]
        public int SectionId { get; set; }
        //Navigation-03
        public virtual Section Section { get; set; }
        public virtual ICollection<StudentAttendance> StudentAttendances { get; set; }
        
    }
    public class Subject
    {
        public Subject()
        {
            this.TeacherSubjects = new List<TeacherSubject>();
        }
        public int SubjectId { get; set; }
        [Required, StringLength(50)]
        public string SubjectName { get; set; }
        [Required, StringLength(20)]
        public string SubjectCode { get; set; }
        [Required, ForeignKey("ClassLevel")]
        public int ClassLevelId { get; set; }
        [Required, EnumDataType(typeof(SubjectScope))]
        public SubjectScope SubjectScope { get; set; }
        [Required, EnumDataType(typeof(SubjectGroup))]
        public SubjectGroup SubjectGroup { get; set; }
        [Required, EnumDataType(typeof(SubjectType))]
        public SubjectType SubjectType { get; set; }
        public virtual ClassLevel ClassLevel { get; set; }
        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
    }
    public class Designation
    {
        public Designation()
        {
            this.Employees = new List<Employee>();
        }
        public int DesignationId { get; set; }
        [Required, StringLength(40)]
        public string PostName { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
    public class Employee
    {
        public Employee()
        {
            this.EmployeeAttendances = new List<EmployeeAttendance>();
        }
        public int EmployeeId { get; set; }
        [Required, StringLength(60)]
        public string EmployeeName { get; set; }
        [Required, EnumDataType(typeof(EmployeeType))]
        public EmployeeType EmployeeType { get; set; }
        [Required, Display(Name = "Phone"), StringLength(15)]
        public string Phone { get; set; }
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required,  StringLength(250)]
        public string PresentAddress { get; set; }
        [Required, StringLength(250)]
        public string PermanentAddress { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime JoinDate { get; set; }
        //[Required, EnumDataType(typeof(BloodGroup))]
       
        //public BloodGroup BloodGroup { get; set; }
        [StringLength(50)]
        public string Picture { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Fingerprint { get; set; }
        //FK-02
        [Required, ForeignKey("Designation")]
        public int DesignationId { get; set; }
        //Navigation-02
        public virtual Designation Designation { get; set; }
        public virtual ICollection<EmployeeAttendance> EmployeeAttendances { get; set; }
    }
    public class Teacher : Employee
    {
        public Teacher()
        {
            this.EmployeeType = EmployeeType.Faculty;
            this.Qualifications = new List<Qualification>();
            this.TeacherSubjects = new List<TeacherSubject>();
        }
        [Required, EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }
        [Required, EnumDataType(typeof(EducationLevel))]
        public  EducationLevel ClassLevel { get; set; }
        [Required, EnumDataType(typeof(SubjectGroup))]
        public SubjectGroup SubjectGroup { get; set; }
        public virtual ICollection<Qualification> Qualifications { get; set; }
        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
    }
    public class TeacherSubject
    {
        public int TeacherSubjectId { get; set; }
        [Required, ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [Required, ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Subject Subject { get; set; }
    }
    public class Qualification
    {
        public int QualificationId { get; set; }
        [Required, StringLength(40)]
        public string Degree { get; set; }
        [Required, StringLength(100)]
        public string InstituteName { get; set; }
        [Required]
        public int CompletionYear { get; set; }
        [Required, StringLength(30)]
        public string Result { get; set; }
        [Required, ForeignKey("Teacher")]
        public int EmployeeId { get; set; }
        public virtual Teacher Teacher { get; set; }
    }
    public class EmployeeAttendance
    {
        public int EmployeeAttendanceId { get; set; }
        [Required, ForeignKey("Employee")]
        public int EmployeeId
        {
            get; set;
        }
        [Required, Column(TypeName = "datetime")]
        public DateTime InTime { get; set; }

        public virtual Employee Employee { get; set; }
    }
    public class StudentAttendance
    {
        public int StudentAttendanceId { get; set; }
        [Required, ForeignKey("Student")]
        public int StudentId
        {
            get; set;
        }
        [Required, Column(TypeName = "datetime")]
        public DateTime InTime { get; set; }

        public virtual Student Student { get; set; }
    }
    public class EimsDbContext : DbContext
    {
        public EimsDbContext(DbContextOptions<EimsDbContext> options) : base(options) { }
        /*
         * Core Entities
         * 
         * */
        public DbSet<InstituteInfo> InstituteInfo { get; set; }
        public DbSet<AcademicSession> AcademicSessions { get; set; }
        public DbSet<AcademicClass> AcademicClasses { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        
        /*
         * Control Setting  Tables
         * */
        public DbSet<ClassLevel> ClassLevels { get; set; }
        public DbSet<BusinessDay> BusinessDays { get; set; }
        public DbSet<ClassDuration> ClassDurations { get; set; }
        public DbSet<EmployeeAttendance> EmployeeAttendances { get; set; }
        public DbSet<StudentAttendance> StudentAttendances { get; set; }

        /*
         * Associated
         * */
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<ClassPeriod> ClassPeriods { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Holiday> Holidays { get; set; }

    }
}
