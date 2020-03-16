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
    public class ShiftsController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public ShiftsController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/Shifts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shift>>> GetShifts()
        {
            return await _context.Shifts.ToListAsync();
        }
        // GET: api/Shifts
        [HttpGet("V1")]
        public async Task<ActionResult<IEnumerable<ShiftViewModel>>> GetShiftVMs()
        {
            return await _context.Shifts.
                Select(x => new ShiftViewModel
                {
                    ShiftId = x.ShiftId,
                    ShiftType = x.ShiftType,
                    StartTime = DateTime.Today.Add(x.StartTime),
                    EndTime = DateTime.Today.Add(x.EndTime),
                    Active = x.Active

                }).ToListAsync();
        }
        [HttpGet("V1/Active")]
        public async Task<ActionResult<IEnumerable<ShiftViewModel>>> GetShiftActiveVMs()
        {
            return await _context.Shifts
                .Where(x=> x.Active)
                .Select(x => new ShiftViewModel
                {
                    ShiftId = x.ShiftId,
                    ShiftType = x.ShiftType,
                    StartTime = DateTime.Today.Add(x.StartTime),
                    EndTime = DateTime.Today.Add(x.EndTime),
                    Active = x.Active

                })
                .ToListAsync();
        }
        // GET: api/Shifts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shift>> GetShift(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);

            if (shift == null)
            {
                return NotFound();
            }

            return shift;
        }

        // PUT: api/Shifts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShift(int id, Shift shift)
        {
            if (id != shift.ShiftId)
            {
                return BadRequest();
            }

            _context.Entry(shift).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShiftExists(id))
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

        // POST: api/Shifts
        [HttpPost]
        public async Task<ActionResult<Shift>> PostShift(Shift shift)
        {
            _context.Shifts.Add(shift);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShift", new { id = shift.ShiftId }, shift);
        }
        [HttpPost("V1")]
        public async Task<ActionResult<IEnumerable<ShiftViewModel>>> PostShiftArray(ShiftViewModel[] shifts)
        {
            foreach(var s in shifts)
            {
                var obj = await _context.Shifts.FirstOrDefaultAsync(x => x.ShiftType == s.ShiftType);
                if(obj == null)
                {
                    _context.Shifts.Add(new Shift
                    {
                        StartTime = s.StartTime.Subtract(s.StartTime.Date),
                        EndTime = s.EndTime.Subtract(s.EndTime.Date),
                        ShiftType=s.ShiftType,
                        Active = s.Active
                    });
                }
                else
                {
                    obj.StartTime = s.StartTime.Subtract(s.StartTime.Date);
                    obj.EndTime = s.EndTime.Subtract(s.EndTime.Date);
                    obj.ShiftType = s.ShiftType;
                    obj.Active = s.Active;
                }
            }
            await _context.SaveChangesAsync();

            return await _context.Shifts
                .Where(x => x.Active)
                .Select(x => new ShiftViewModel
                {
                    ShiftId = x.ShiftId,
                    ShiftType = x.ShiftType,
                    StartTime = DateTime.Today.Add(x.StartTime),
                    EndTime = DateTime.Today.Add(x.EndTime),
                    Active = x.Active

                }).ToListAsync(); 
        }
        // DELETE: api/Shifts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Shift>> DeleteShift(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();

            return shift;
        }

        private bool ShiftExists(int id)
        {
            return _context.Shifts.Any(e => e.ShiftId == id);
        }
    }
}
