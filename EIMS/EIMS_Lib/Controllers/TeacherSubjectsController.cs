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
    public class TeacherSubjectsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public TeacherSubjectsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/TeacherSubjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherSubject>>> GetTeacherSubjects()
        {
            return await _context.TeacherSubjects.ToListAsync();
        }
        [HttpGet("Ex")]
        public async Task<ActionResult<IEnumerable<TeacherSubjectViewModel>>> GetTeacherSubjectViewModels()
        {
            var data= await _context.Teachers.Include(x=> x.TeacherSubjects)
                .Select(x=> new TeacherSubjectViewModel
                {
                    EmployeeId=x.EmployeeId,
                    EmployeeName=x.EmployeeName,
                    Picture=x.Picture,
                    Subjects = string.Join(",", x.TeacherSubjects.Select(y=> y.Subject.SubjectName ).ToArray())
                })
                .ToListAsync();
            return data;
        }
        // GET: api/TeacherSubjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherSubject>> GetTeacherSubject(int id)
        {
            var teacherSubject = await _context.TeacherSubjects.FindAsync(id);

            if (teacherSubject == null)
            {
                return NotFound();
            }

            return teacherSubject;
        }
        [HttpGet("Teacher/Ex/{id}")]
        public async Task<ActionResult<IEnumerable<TeacherSubject>>> GetTeacherSubjectListExtended(int id)
        {
            return await _context.TeacherSubjects
                .Include(x => x.Employee)
                .Include(x => x.Subject)
                .Where(x => x.EmployeeId == id)
                .ToListAsync();

            
        }
        [HttpGet("Teacher/{id}")]
        public async Task<ActionResult<IEnumerable<TeacherSubject>>> GetTeacherSubjectList(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher.TeacherSubjects.ToList();
        }
        // PUT: api/TeacherSubjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacherSubject(int id, TeacherSubject teacherSubject)
        {
            if (id != teacherSubject.TeacherSubjectId)
            {
                return BadRequest();
            }

            _context.Entry(teacherSubject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherSubjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeacherSubjects
        [HttpPost]
        public async Task<ActionResult<TeacherSubject>> PostTeacherSubject(TeacherSubject teacherSubject)
        {
            _context.TeacherSubjects.Add(teacherSubject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacherSubject", new { id = teacherSubject.TeacherSubjectId }, teacherSubject);
        }

        // DELETE: api/TeacherSubjects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeacherSubject>> DeleteTeacherSubject(int id)
        {
            var teacherSubject = await _context.TeacherSubjects.FindAsync(id);
            if (teacherSubject == null)
            {
                return NotFound();
            }

            _context.TeacherSubjects.Remove(teacherSubject);
            await _context.SaveChangesAsync();

            return teacherSubject;
        }

        private bool TeacherSubjectExists(int id)
        {
            return _context.TeacherSubjects.Any(e => e.TeacherSubjectId == id);
        }
    }
}
