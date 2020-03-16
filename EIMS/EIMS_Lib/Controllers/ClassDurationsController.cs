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
    public class ClassDurationsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public ClassDurationsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/ClassDurations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassDuration>>> GetClassDurations()
        {
            return await _context.ClassDurations.ToListAsync();
        }

        // GET: api/ClassDurations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassDuration>> GetClassDuration(int id)
        {
            var classDuration = await _context.ClassDurations.FindAsync(id);

            if (classDuration == null)
            {
                return NotFound();
            }

            return classDuration;
        }

        // PUT: api/ClassDurations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassDuration(int id, ClassDuration classDuration)
        {
            if (id != classDuration.ClassDurationId)
            {
                return BadRequest();
            }

            _context.Entry(classDuration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassDurationExists(id))
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

        // POST: api/ClassDurations
        [HttpPost]
        public async Task<ActionResult<ClassDuration>> PostClassDuration(ClassDuration classDuration)
        {
            _context.ClassDurations.Add(classDuration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassDuration", new { id = classDuration.ClassDurationId }, classDuration);
        }
        [HttpPost("Bulk")]
        public async Task<ActionResult<IEnumerable<ClassDuration>>> PostClassDurationArray(ClassDuration[] classDurations)
        {
            
            foreach(var c in classDurations)
            {
                var obj = _context.ClassDurations.FirstOrDefault(x => x.ClassType == c.ClassType);
                if(obj == null)
                {
                    _context.ClassDurations.Add(c);
                }
                else
                {
                    obj.Duration = c.Duration;
                }
            }
            await _context.SaveChangesAsync();

            return await _context.ClassDurations.ToListAsync();
        }
        // DELETE: api/ClassDurations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClassDuration>> DeleteClassDuration(int id)
        {
            var classDuration = await _context.ClassDurations.FindAsync(id);
            if (classDuration == null)
            {
                return NotFound();
            }

            _context.ClassDurations.Remove(classDuration);
            await _context.SaveChangesAsync();

            return classDuration;
        }

        private bool ClassDurationExists(int id)
        {
            return _context.ClassDurations.Any(e => e.ClassDurationId == id);
        }
    }
}
