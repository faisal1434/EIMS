USE [EIMS_MasterDb]
GO
/****** Object:  StoredProcedure [dbo].[GenerateClassPeriods]    Script Date: 12/14/2019 10:10:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GenerateClassPeriods] @ShiftId INT
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
SELECT * FROM ClassPeriods