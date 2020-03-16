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
    public class AcademicSessionsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public AcademicSessionsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/AcademicSessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicSession>>> GetAcademicSessions()
        {
            return await _context.AcademicSessions.ToListAsync();
        }

        // GET: api/AcademicSessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicSession>> GetAcademicSession(int id)
        {
            var academicSession = await _context.AcademicSessions.FindAsync(id);

            if (academicSession == null)
            {
                return NotFound();
            }

            return academicSession;
        }
        [HttpGet("Running")]
        public async Task<ActionResult<AcademicSession>> GetRunningAcademicSession()
        {
            var academicSession = await _context.AcademicSessions.FirstOrDefaultAsync(x=> x.SessionStatus == SessionStatus.Running);

            if (academicSession == null)
            {
                return NotFound();
            }

            return academicSession;
        }
        // PUT: api/AcademicSessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicSession(int id, AcademicSession academicSession)
        {
            if (id != academicSession.AcademicSessionId)
            {
                return BadRequest();
            }

            _context.Entry(academicSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicSessionExists(id))
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

        // POST: api/AcademicSessions
        [HttpPost]
        public async Task<ActionResult<AcademicSession>> PostAcademicSession(AcademicSession academicSession)
        {
            
            _context.AcademicSessions.Add(academicSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicSession", new { id = academicSession.AcademicSessionId }, academicSession);
        }

        // DELETE: api/AcademicSessions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AcademicSession>> DeleteAcademicSession(int id)
        {
            var academicSession = await _context.AcademicSessions.FindAsync(id);
            if (academicSession == null)
            {
                return NotFound();
            }

            _context.AcademicSessions.Remove(academicSession);
            await _context.SaveChangesAsync();

            return academicSession;
        }

        private bool AcademicSessionExists(int id)
        {
            return _context.AcademicSessions.Any(e => e.AcademicSessionId == id);
        }
    }
}
