using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EIMS_Lib.Models;
using EIMS_Lib.ViewModels;

namespace EIMS_Lib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAttendancesFPController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public EmployeeAttendancesFPController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeAttendances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeAttendance>>> GetEmployeeAttendances()
        {
            return await _context.EmployeeAttendances.ToListAsync();
        }

        // GET: api/EmployeeAttendances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeAttendance>> GetEmployeeAttendance(int id)
        {
            var employeeAttendance = await _context.EmployeeAttendances.FindAsync(id);

            if (employeeAttendance == null)
            {
                return NotFound();
            }

            return employeeAttendance;
        }

        // PUT: api/EmployeeAttendances/5
        [HttpPut("{id}")]
        public async Task<ActionResult<AttendenceVMEmp>> PutEmployeeAttendance(int id)
        {

            var emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == id);
            if (emp == null) return NotFound();
            var att = _context.EmployeeAttendances.FirstOrDefault(x => x.EmployeeId == emp.EmployeeId && x.InTime.Date == DateTime.Now.Date);
            if(att == null)
            {
                att = new EmployeeAttendance { EmployeeId = emp.EmployeeId, InTime = DateTime.Now };
                _context.EmployeeAttendances.Add(att);
            }
            else
            {
                att.InTime = DateTime.Now;
            }

            try
            {
                await _context.SaveChangesAsync();
                return new AttendenceVMEmp { EmployeeId = att.EmployeeId, EmployeeName = emp.EmployeeName, Time = att.InTime };
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeAttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

           
        }
        [HttpPut("std/{id}")]
        public async Task<ActionResult<AttendenceVMEmp>> PutStudentAttendance(int id)
        {

            var std = _context.Students.FirstOrDefault(x => x.StudentId == id);
            if (std == null) return NotFound();
            var att = _context.StudentAttendances.FirstOrDefault(x => x.StudentId == std.StudentId && x.InTime.Date == DateTime.Now.Date);
            if (att == null)
            {
                att = new StudentAttendance { StudentId = std.StudentId, InTime = DateTime.Now };
                _context.StudentAttendances.Add(att);
            }
            else
            {
                att.InTime = DateTime.Now;
            }

            try
            {
                await _context.SaveChangesAsync();
                return new AttendenceVMEmp { EmployeeId = att.StudentId, EmployeeName = std.StudentName, Time = att.InTime };
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeAttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


        }
        // POST: api/EmployeeAttendances
        [HttpPost]
        public async Task<ActionResult<EmployeeAttendance>> PostEmployeeAttendance(EmployeeAttendance employeeAttendance)
        {
            _context.EmployeeAttendances.Add(employeeAttendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeAttendance", new { id = employeeAttendance.EmployeeAttendanceId }, employeeAttendance);
        }

        // DELETE: api/EmployeeAttendances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeAttendance>> DeleteEmployeeAttendance(int id)
        {
            var employeeAttendance = await _context.EmployeeAttendances.FindAsync(id);
            if (employeeAttendance == null)
            {
                return NotFound();
            }

            _context.EmployeeAttendances.Remove(employeeAttendance);
            await _context.SaveChangesAsync();

            return employeeAttendance;
        }

        private bool EmployeeAttendanceExists(int id)
        {
            return _context.EmployeeAttendances.Any(e => e.EmployeeAttendanceId == id);
        }
    }
}
