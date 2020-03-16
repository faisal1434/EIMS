using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EIMS_Lib.Models;
using System.Data.SqlClient;
using EIMS_Lib.ViewModels;

namespace EIMS_Lib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassPeriodsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public ClassPeriodsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/ClassPeriods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassPeriod>>> GetClassPeriods()
        {
            return await _context.ClassPeriods.ToListAsync();
        }
        [HttpGet("Generate/{ShiftId}")]
        public async Task<ActionResult<IEnumerable<ClassPeriodViewModel>>> GetClassPeriodsGenerated(int ShiftId)
        {
            List<ClassPeriod> periods;
            var shift = await _context.Shifts.FirstOrDefaultAsync(x => x.ShiftId == ShiftId);
            if(shift == null)
            {
                return BadRequest(new Exception("Shift, Class Duration setting not found"));
            }
            else
            {
                if(!_context.ClassPeriods.Any(x=> x.ShiftId == ShiftId))
                {
                    SqlParameter p = new SqlParameter("@ShiftId", System.Data.SqlDbType.Int) { Value = ShiftId};
                    periods = await _context.ClassPeriods.FromSql($"EXEC dbo.GenerateClassPeriods {ShiftId}").ToListAsync();
                   
                }
               else
                {
                   periods = await _context.ClassPeriods.Where(x => x.ShiftId == ShiftId).ToListAsync();
                }
                
              
                

            }
             
            return periods
                .Select(p => new ClassPeriodViewModel
                {
                    ClassPeriodId = p.ClassPeriodId,
                    ShiftId = p.ShiftId,
                    ClassType = p.ClassType,
                    StartTime = DateTime.Today.Add(p.StartTime),
                    EndTime = DateTime.Today.Add(p.EndTime)
                })
                .ToList();
        }
        [HttpGet("ReGenerate/{ShiftId}")]
        public async Task<ActionResult<IEnumerable<ClassPeriodViewModel>>> GetClassPeriodsReGenerated(int ShiftId)
        {
            List<ClassPeriod> periods;
            var shift = await _context.Shifts.FirstOrDefaultAsync(x => x.ShiftId == ShiftId);
            if (shift == null)
            {
                return BadRequest(new Exception("Shift, Class Duration setting not found"));
            }
            else
            {
                if (_context.ClassPeriods.Any(x=> x.ShiftId == ShiftId))
                {
                    var existing = _context.ClassPeriods.Where(x => x.ShiftId == ShiftId);
                    _context.ClassPeriods.RemoveRange(existing);
                    _context.SaveChanges();
                }
                SqlParameter p = new SqlParameter("@ShiftId", System.Data.SqlDbType.Int) { Value = ShiftId };
                try
                {
                    periods = await _context.ClassPeriods.FromSql<ClassPeriod>("EXECUTE GenerateClassPeriods @ShiftId", p).ToListAsync();
                }
                catch(Exception ex)
                {
                    return BadRequest(new Exception(ex.Message));
                }
               



            }
            return periods
                .Select(p => new ClassPeriodViewModel
                {
                    ClassPeriodId = p.ClassPeriodId,
                    ShiftId = p.ShiftId,
                    ClassType = p.ClassType,
                    StartTime = DateTime.Today.Add(p.StartTime),
                    EndTime = DateTime.Today.Add(p.EndTime)
                })
                .ToList();
        }
        [HttpGet("Shift/{ShiftId}")]
        public async Task<ActionResult<IEnumerable<ClassPeriodViewModel>>> GetShiftClassPeriods(int ShiftId)
        {

            var periods = await _context
                .ClassPeriods
                .Where(x => x.ShiftId == ShiftId)
                .ToListAsync();
             return periods   
                .Select(p => new ClassPeriodViewModel
                {
                    ClassPeriodId = p.ClassPeriodId,
                    ClassType = p.ClassType,
                    StartTime = DateTime.Today.Add(p.StartTime),
                    EndTime = DateTime.Today.Add(p.EndTime)
                })
                .ToList();
        }
        //GET: api/ClassPeriods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassPeriod>> GetClassPeriod(int id)
        {
            var classPeriod = await _context.ClassPeriods.FindAsync(id);

            if (classPeriod == null)
            {
                return NotFound();
            }

            return classPeriod;
        }

        // PUT: api/ClassPeriods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassPeriod(int id, ClassPeriod classPeriod)
        {
            if (id != classPeriod.ClassPeriodId)
            {
                return BadRequest();
            }

            _context.Entry(classPeriod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassPeriodExists(id))
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

        // POST: api/ClassPeriods
        [HttpPost]
        public async Task<ActionResult<ClassPeriod>> PostClassPeriod(ClassPeriod classPeriod)
        {
            _context.ClassPeriods.Add(classPeriod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassPeriod", new { id = classPeriod.ClassPeriodId }, classPeriod);
        }

        // DELETE: api/ClassPeriods/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClassPeriod>> DeleteClassPeriod(int id)
        {
            var classPeriod = await _context.ClassPeriods.FindAsync(id);
            if (classPeriod == null)
            {
                return NotFound();
            }

            _context.ClassPeriods.Remove(classPeriod);
            await _context.SaveChangesAsync();

            return classPeriod;
        }

        private bool ClassPeriodExists(int id)
        {
            return _context.ClassPeriods.Any(e => e.ClassPeriodId == id);
        }
    }
}
