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
    public class ClassLevelsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public ClassLevelsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/ClassLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassLevel>>> GetClassLevels()
        {
            if (!_context.ClassLevels.Any())
            {
                string[] levels = Enum.GetNames(typeof(EducationLevel));
                foreach (var l in levels)
                {
                    _context.ClassLevels.Add(new ClassLevel { EducationLevel = (EducationLevel)Enum.Parse(typeof(EducationLevel), l), IsRunning = false });
                }
                await _context.SaveChangesAsync();
            }
            return await _context.ClassLevels.ToListAsync();
        }
        [HttpGet("Active")]
        public async Task<ActionResult<IEnumerable<ClassLevel>>> GetActiveClassLevels()
        {
           
            return await _context.ClassLevels.Where(x=> x.IsRunning).ToListAsync();
        }
        // GET: api/ClassLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassLevel>> GetClassLevel(int id)
        {
            var classLevel = await _context.ClassLevels.FindAsync(id);

            if (classLevel == null)
            {
                return NotFound();
            }

            return classLevel;
        }

        // PUT: api/ClassLevels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassLevel(int id, ClassLevel classLevel)
        {
            if (id != classLevel.ClassLevelId)
            {
                return BadRequest();
            }

            _context.Entry(classLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassLevelExists(id))
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

        // POST: api/ClassLevels
        [HttpPost]
        public async Task<ActionResult<ClassLevel>> PostClassLevel(ClassLevel classLevel)
        {
            _context.ClassLevels.Add(classLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassLevel", new { id = classLevel.ClassLevelId }, classLevel);
        }
        // POST: api/ClassLevels
        [HttpPost("Array")]
        public async Task<ActionResult<IEnumerable<ClassLevel>>> PostClassLevelArray(ClassLevel[] classLevels)
        {
            foreach(var l in classLevels)
            {
                var obj = _context.ClassLevels.FirstOrDefault(x => x.EducationLevel == l.EducationLevel);
                if(obj == null)
                {
                    _context.ClassLevels.Add(l);
                }
                else
                {
                    obj.IsRunning = l.IsRunning;
                }
               
            }
            _context.SaveChanges();

            return await _context.ClassLevels.ToListAsync();
        }
        // DELETE: api/ClassLevels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClassLevel>> DeleteClassLevel(int id)
        {
            var classLevel = await _context.ClassLevels.FindAsync(id);
            if (classLevel == null)
            {
                return NotFound();
            }

            _context.ClassLevels.Remove(classLevel);
            await _context.SaveChangesAsync();

            return classLevel;
        }

        private bool ClassLevelExists(int id)
        {
            return _context.ClassLevels.Any(e => e.ClassLevelId == id);
        }
    }
}
