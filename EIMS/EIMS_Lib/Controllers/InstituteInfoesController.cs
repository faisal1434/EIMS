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
    public class InstituteInfoesController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public InstituteInfoesController(EimsDbContext context)
        {
            _context = context;
        }

        // GET: api/InstituteInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstituteInfo>>> GetInstituteInfo()
        {
            return await _context.InstituteInfo.ToListAsync();
        }

        // GET: api/InstituteInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InstituteInfo>> GetInstituteInfo(int id)
        {
            var instituteInfo = await _context.InstituteInfo.FindAsync(id);

            if (instituteInfo == null)
            {
                return NotFound();
            }

            return instituteInfo;
        }

        // PUT: api/InstituteInfoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstituteInfo(int id, InstituteInfo instituteInfo)
        {
            if (id != instituteInfo.InstituteInfoId)
            {
                return BadRequest();
            }

            _context.Entry(instituteInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstituteInfoExists(id))
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

        // POST: api/InstituteInfoes
        [HttpPost]
        public async Task<ActionResult<InstituteInfo>> PostInstituteInfo(InstituteInfo instituteInfo)
        {
            _context.InstituteInfo.Add(instituteInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstituteInfo", new { id = instituteInfo.InstituteInfoId }, instituteInfo);
        }

        // DELETE: api/InstituteInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<InstituteInfo>> DeleteInstituteInfo(int id)
        {
            var instituteInfo = await _context.InstituteInfo.FindAsync(id);
            if (instituteInfo == null)
            {
                return NotFound();
            }

            _context.InstituteInfo.Remove(instituteInfo);
            await _context.SaveChangesAsync();

            return instituteInfo;
        }

        private bool InstituteInfoExists(int id)
        {
            return _context.InstituteInfo.Any(e => e.InstituteInfoId == id);
        }
    }
}
