using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EIMS_Lib.Migrations.EIMS
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AcademicSessions",
                columns: table => new
                {
                    AcademicSessionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SessionName = table.Column<string>(maxLength: 20, nullable: false),
                    StartDate = table.Column<DateTime>(type: "date", nullable: false),
                    EndDate = table.Column<DateTime>(type: "date", nullable: false),
                    SessionStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcademicSessions", x => x.AcademicSessionId);
                });

            migrationBuilder.CreateTable(
                name: "BusinessDays",
                columns: table => new
                {
                    BusinessDayId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Weekday = table.Column<int>(nullable: false),
                    IsOn = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessDays", x => x.BusinessDayId);
                });

            migrationBuilder.CreateTable(
                name: "ClassDurations",
                columns: table => new
                {
                    ClassDurationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClassType = table.Column<int>(nullable: false),
                    Duration = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassDurations", x => x.ClassDurationId);
                });

            migrationBuilder.CreateTable(
                name: "ClassLevels",
                columns: table => new
                {
                    ClassLevelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EducationLevel = table.Column<int>(nullable: false),
                    IsRunning = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassLevels", x => x.ClassLevelId);
                });

            migrationBuilder.CreateTable(
                name: "Designations",
                columns: table => new
                {
                    DesignationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PostName = table.Column<string>(maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designations", x => x.DesignationId);
                });

            migrationBuilder.CreateTable(
                name: "Holidays",
                columns: table => new
                {
                    HolidayId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HolidayDate = table.Column<DateTime>(type: "date", nullable: false),
                    HolidayType = table.Column<int>(nullable: false),
                    Duration = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holidays", x => x.HolidayId);
                });

            migrationBuilder.CreateTable(
                name: "InstituteInfo",
                columns: table => new
                {
                    InstituteInfoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InstituteName = table.Column<string>(nullable: false),
                    Established = table.Column<DateTime>(type: "date", nullable: false),
                    InstituteSlogan = table.Column<string>(nullable: false),
                    PrincipalName = table.Column<string>(maxLength: 100, nullable: false),
                    FounderName = table.Column<string>(maxLength: 40, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Address = table.Column<string>(maxLength: 250, nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstituteInfo", x => x.InstituteInfoId);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    RoomId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoomType = table.Column<int>(nullable: false),
                    RoomNo = table.Column<string>(maxLength: 20, nullable: false),
                    Capacity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.RoomId);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    ShiftId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ShiftType = table.Column<int>(nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.ShiftId);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    SubjectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SubjectName = table.Column<string>(maxLength: 50, nullable: false),
                    SubjectCode = table.Column<string>(maxLength: 20, nullable: false),
                    ClassLevelId = table.Column<int>(nullable: false),
                    SubjectScope = table.Column<int>(nullable: false),
                    SubjectGroup = table.Column<int>(nullable: false),
                    SubjectType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.SubjectId);
                    table.ForeignKey(
                        name: "FK_Subjects_ClassLevels_ClassLevelId",
                        column: x => x.ClassLevelId,
                        principalTable: "ClassLevels",
                        principalColumn: "ClassLevelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeName = table.Column<string>(maxLength: 60, nullable: false),
                    EmployeeType = table.Column<int>(nullable: false),
                    Phone = table.Column<string>(maxLength: 15, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    PresentAddress = table.Column<string>(maxLength: 250, nullable: false),
                    PermanentAddress = table.Column<string>(maxLength: 250, nullable: false),
                    JoinDate = table.Column<DateTime>(type: "date", nullable: false),
                    Picture = table.Column<string>(maxLength: 50, nullable: true),
                    Fingerprint = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    DesignationId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Gender = table.Column<int>(nullable: true),
                    ClassLevel = table.Column<int>(nullable: true),
                    SubjectGroup = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Designations_DesignationId",
                        column: x => x.DesignationId,
                        principalTable: "Designations",
                        principalColumn: "DesignationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AcademicClasses",
                columns: table => new
                {
                    AcademicClassId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClassName = table.Column<string>(maxLength: 30, nullable: false),
                    AcademicSessionId = table.Column<int>(nullable: false),
                    ClassLevelId = table.Column<int>(nullable: false),
                    ShiftId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcademicClasses", x => x.AcademicClassId);
                    table.ForeignKey(
                        name: "FK_AcademicClasses_AcademicSessions_AcademicSessionId",
                        column: x => x.AcademicSessionId,
                        principalTable: "AcademicSessions",
                        principalColumn: "AcademicSessionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AcademicClasses_ClassLevels_ClassLevelId",
                        column: x => x.ClassLevelId,
                        principalTable: "ClassLevels",
                        principalColumn: "ClassLevelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AcademicClasses_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "ShiftId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassPeriods",
                columns: table => new
                {
                    ClassPeriodId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ShiftId = table.Column<int>(nullable: false),
                    ClassType = table.Column<int>(nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassPeriods", x => x.ClassPeriodId);
                    table.ForeignKey(
                        name: "FK_ClassPeriods_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "ShiftId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Qualifications",
                columns: table => new
                {
                    QualificationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Degree = table.Column<string>(maxLength: 40, nullable: false),
                    InstituteName = table.Column<string>(maxLength: 100, nullable: false),
                    CompletionYear = table.Column<int>(nullable: false),
                    Result = table.Column<string>(maxLength: 30, nullable: false),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Qualifications", x => x.QualificationId);
                    table.ForeignKey(
                        name: "FK_Qualifications_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    SectionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SectionName = table.Column<string>(maxLength: 40, nullable: false),
                    SubjectGroup = table.Column<int>(nullable: false),
                    AcademicClassId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.SectionId);
                    table.ForeignKey(
                        name: "FK_Sections_AcademicClasses_AcademicClassId",
                        column: x => x.AcademicClassId,
                        principalTable: "AcademicClasses",
                        principalColumn: "AcademicClassId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StudentName = table.Column<string>(maxLength: 50, nullable: false),
                    Roll = table.Column<string>(maxLength: 15, nullable: false),
                    Gender = table.Column<int>(nullable: false),
                    BloodGroup = table.Column<int>(nullable: false),
                    BirthDate = table.Column<DateTime>(type: "date", nullable: false),
                    FatherName = table.Column<string>(maxLength: 50, nullable: false),
                    MotherName = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Address = table.Column<string>(maxLength: 250, nullable: false),
                    Picture = table.Column<string>(maxLength: 250, nullable: true),
                    Fingerprint = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    SectionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_Students_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "SectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcademicClasses_AcademicSessionId",
                table: "AcademicClasses",
                column: "AcademicSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_AcademicClasses_ClassLevelId",
                table: "AcademicClasses",
                column: "ClassLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_AcademicClasses_ShiftId",
                table: "AcademicClasses",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassPeriods_ShiftId",
                table: "ClassPeriods",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DesignationId",
                table: "Employees",
                column: "DesignationId");

            migrationBuilder.CreateIndex(
                name: "IX_Qualifications_EmployeeId",
                table: "Qualifications",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_AcademicClassId",
                table: "Sections",
                column: "AcademicClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_SectionId",
                table: "Students",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_ClassLevelId",
                table: "Subjects",
                column: "ClassLevelId");
            //////////////////////////////////////////////////
            migrationBuilder.Sql(@"CREATE PROCEDURE [dbo].[GenerateClassPeriods] @ShiftId INT
                        AS
                        DECLARE @i INT = 1
                        DECLARE @st TIME, @et TIME, @cduration INT, @bduration INT
                        SELECT @st = StartTime, @et=EndTime FROM Shifts WHERE ShiftId=@ShiftId
                        SELECT @cduration = Duration FROM ClassDurations WHERE ClassType = 1
                        SELECT @bduration = Duration FROM ClassDurations WHERE ClassType = 4
                        WHILE @i <= 7
                        BEGIN
	                        IF @i = 4
	                        BEGIN
		                        SET @et = CAST(DATEADD(minute, @bduration, (CAST(@st AS DATETIME))) AS TIME)
		                        INSERT INTO ClassPeriods (ShiftId, ClassType, StartTime, EndTime) VALUES(@ShiftId, 4, @st, @et)
	                        END
	                        ELSE
	                        BEGIN
		                        SET @et = CAST(DATEADD(minute, @cduration, (CAST(@st AS DATETIME))) AS TIME)
		                        INSERT INTO ClassPeriods (ShiftId, ClassType, StartTime, EndTime) VALUES(@ShiftId, 1, @st, @et)
	                        END
	                        set @st = @et
	                        SET @i += 1
                        END
                        SELECT * FROM ClassPeriods WHERE ShiftId = @ShiftId
                        RETURN");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessDays");

            migrationBuilder.DropTable(
                name: "ClassDurations");

            migrationBuilder.DropTable(
                name: "ClassPeriods");

            migrationBuilder.DropTable(
                name: "Holidays");

            migrationBuilder.DropTable(
                name: "InstituteInfo");

            migrationBuilder.DropTable(
                name: "Qualifications");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "Designations");

            migrationBuilder.DropTable(
                name: "AcademicClasses");

            migrationBuilder.DropTable(
                name: "AcademicSessions");

            migrationBuilder.DropTable(
                name: "ClassLevels");

            migrationBuilder.DropTable(
                name: "Shifts");
            /////////////////////////////////
            migrationBuilder.Sql(@"DROP PROCEDURE GenerateClassPeriods");
        }
    }
}
