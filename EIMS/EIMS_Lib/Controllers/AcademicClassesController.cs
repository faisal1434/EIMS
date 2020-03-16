using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EIMS_Lib.Models;

namespace EIMS_Lib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicClassesController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public AcademicClassesController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/AcademicClasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicClass>>> GetAcademicClasses()
        {
            return await _context.AcademicClasses.ToListAsync();
        }
        [HttpGet("Running")]
        public async Task<ActionResult<IEnumerable<AcademicClass>>> GetRunningAcademicClasses()
        {
            return await _context.AcademicClasses.Where(x=> x.AcademicSession.SessionStatus == SessionStatus.Running).ToListAsync();
        }
        [HttpGet("Session/{sessionId}")]
        public async Task<ActionResult<IEnumerable<AcademicClass>>> GetSessionAcademicClasses(int sessionId)
        {
            return await _context.AcademicClasses.Where(x => x.AcademicSessionId == sessionId).ToListAsync();
        }
        // GET: api/AcademicClasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicClass>> GetAcademicClass(int id)
        {
            var academicClass = await _context.AcademicClasses.FindAsync(id);

            if (academicClass == null)
            {
                return NotFound();
            }

            return academicClass;
        }

        // PUT: api/AcademicClasses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicClass(int id, AcademicClass academicClass)
        {
            if (id != academicClass.AcademicClassId)
            {
                return BadRequest();
            }

            _context.Entry(academicClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicClassExists(id))
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

        // POST: api/AcademicClasses
        [HttpPost]
        public async Task<ActionResult<AcademicClass>> PostAcademicClass(AcademicClass academicClass)
        {
            _context.AcademicClasses.Add(academicClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicClass", new { id = academicClass.AcademicClassId }, academicClass);
        }

        // DELETE: api/AcademicClasses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AcademicClass>> DeleteAcademicClass(int id)
        {
            var academicClass = await _context.AcademicClasses.FindAsync(id);
            if (academicClass == null)
            {
                return NotFound();
            }

            _context.AcademicClasses.Remove(academicClass);
            await _context.SaveChangesAsync();

            return academicClass;
        }

        private bool AcademicClassExists(int id)
        {
            return _context.AcademicClasses.Any(e => e.AcademicClassId == id);
        }
    }
}
