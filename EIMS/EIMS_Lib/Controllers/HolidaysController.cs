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
    public class HolidaysController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public HolidaysController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/Holidays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Holiday>>> GetHolidays()
        {
            return await _context.Holidays.ToListAsync();
        }
        [HttpGet("Views")]
        public async Task<ActionResult<IEnumerable<HolidayViewModel>>> GetHolidayViews()
        {
            return await _context.Holidays
                  .Select(x => new HolidayViewModel
                  {
                      HolidayId=x.HolidayId,
                      HolidayDate=x.HolidayDate,
                      HolidayType=x.HolidayType,
                      Upto=x.HolidayDate.AddDays(x.Duration-1),
                      Description=x.Description
                  })
                .ToListAsync();
        }
        [HttpGet("Events")]
        public async Task<ActionResult<IEnumerable<CalendarEventViewModel>>> GetHolidayEvents()
        { 
            List<CalendarEventViewModel> data = new List<CalendarEventViewModel>();
            var model = await _context.Holidays
               .ToListAsync();

            model.ForEach(h =>
            {
                if(h.HolidayType != HolidayType.VACATION)
                {
                    data.Add(new CalendarEventViewModel { Id = h.HolidayId, Date = h.HolidayDate, Type = h.HolidayType, Description=h.Description });
                }
                else
                {
                    for(int i=0; i <= h.Duration; i++)
                    {
                        data.Add(new CalendarEventViewModel { Id = h.HolidayId, Date = h.HolidayDate.AddDays(i), Type = HolidayType.VACATION, Description = h.Description });
                    }
                }
            });
                
                
            return data.ToList();

        }
        // GET: api/Holidays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Holiday>> GetHoliday(int id)
        {
            var holiday = await _context.Holidays.FindAsync(id);

            if (holiday == null)
            {
                return NotFound();
            }

            return holiday;
        }

        // PUT: api/Holidays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHoliday(int id, Holiday holiday)
        {
            if (id != holiday.HolidayId)
            {
                return BadRequest();
            }

            _context.Entry(holiday).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HolidayExists(id))
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

        // POST: api/Holidays
        [HttpPost]
        public async Task<ActionResult<Holiday>> PostHoliday(Holiday holiday)
        {
            _context.Holidays.Add(holiday);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHoliday", new { id = holiday.HolidayId }, holiday);
        }

        // DELETE: api/Holidays/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Holiday>> DeleteHoliday(int id)
        {
            var holiday = await _context.Holidays.FindAsync(id);
            if (holiday == null)
            {
                return NotFound();
            }

            _context.Holidays.Remove(holiday);
            await _context.SaveChangesAsync();

            return holiday;
        }

        private bool HolidayExists(int id)
        {
            return _context.Holidays.Any(e => e.HolidayId == id);
        }
    }
}
