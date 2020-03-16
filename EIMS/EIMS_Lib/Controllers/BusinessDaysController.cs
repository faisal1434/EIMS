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
    public class BusinessDaysController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public BusinessDaysController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/BusinessDays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessDay>>> GetBusinessDays()
        {
            return await _context.BusinessDays.ToListAsync();
        }

        // GET: api/BusinessDays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessDay>> GetBusinessDay(int id)
        {
            var businessDay = await _context.BusinessDays.FindAsync(id);

            if (businessDay == null)
            {
                return NotFound();
            }

            return businessDay;
        }

        // PUT: api/BusinessDays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessDay(int id, BusinessDay businessDay)
        {
            if (id != businessDay.BusinessDayId)
            {
                return BadRequest();
            }

            _context.Entry(businessDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessDayExists(id))
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

        // POST: api/BusinessDays
        [HttpPost]
        public async Task<ActionResult<BusinessDay>> PostBusinessDay(BusinessDay businessDay)
        {
            _context.BusinessDays.Add(businessDay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusinessDay", new { id = businessDay.BusinessDayId }, businessDay);
        }
        [HttpPost("Bulk")]
        public async Task<ActionResult> PostBusinessDayArray(BusinessDay[] businessDays)
        {
            foreach (var b in businessDays)
            {
                var obj= _context.BusinessDays.FirstOrDefault(x => x.Weekday == b.Weekday);
                if(obj != null)
                {
                    obj.IsOn = b.IsOn;
                }
                else
                {
                    _context.BusinessDays.Add(b);
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/BusinessDays/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BusinessDay>> DeleteBusinessDay(int id)
        {
            var businessDay = await _context.BusinessDays.FindAsync(id);
            if (businessDay == null)
            {
                return NotFound();
            }

            _context.BusinessDays.Remove(businessDay);
            await _context.SaveChangesAsync();

            return businessDay;
        }

        private bool BusinessDayExists(int id)
        {
            return _context.BusinessDays.Any(e => e.BusinessDayId == id);
        }
    }
}
