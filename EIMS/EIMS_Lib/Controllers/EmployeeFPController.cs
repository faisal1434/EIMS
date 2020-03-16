using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using EIMS_Lib.Models;
using EIMS_Lib.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EIMS_Lib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeFPController : ControllerBase
    {
        private readonly EimsDbContext _context;

        public EmployeeFPController(EimsDbContext context)
        {
            _context = context;
        }
        // GET: api/EmployeeFP
        [HttpGet]
        public IEnumerable<EmployeeNameVM> Get()
        {
            return _context.Employees.Select(x => new EmployeeNameVM { EmployeeId = x.EmployeeId, EmployeeName = x.EmployeeName });
        }
        [HttpGet("std")]
        public IEnumerable<StudentNameVM> GetStudents()
        {
            return _context.Students.Select(x => new StudentNameVM { StudentId = x.StudentId, StudentName = x.StudentName });
        }
        // GET: api/EmployeeFP/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<bool> Get(int id, [FromQuery]string t="")
        {
            if (string.IsNullOrEmpty(t))
            {
                var emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == id);
                if (emp == null) return NotFound();
                else return !string.IsNullOrEmpty(emp.Fingerprint);
            }
            else
            {
                var std = _context.Students.FirstOrDefault(x => x.StudentId == id);
                if (std == null) return NotFound();
                else return !string.IsNullOrEmpty(std.Fingerprint);
            }


        }
        //[HttpGet("std/{id}", Name = "Get")]
        //public ActionResult<bool> GetStudent(int id)
        //{
        //    var std = _context.Students.FirstOrDefault(x => x.StudentId == id);
        //    if (std == null) return NotFound();
        //    else return !string.IsNullOrEmpty(std.Fingerprint);

        //}
        // POST: api/EmployeeFP
        [HttpPost]
        public ActionResult<EmployeeFPVM> Post([FromBody]FPModel model)
        {
            var emp = _context.Employees.FirstOrDefault(x => x.Fingerprint == model.value);
            if (emp == null) return NotFound();
            else return new EmployeeFPVM { EmployeeId=emp.EmployeeId, EmployeeName=emp.EmployeeName, fp=emp.Fingerprint};
        }
       
        // POST: api/EmployeeFP/1
        [HttpPost("{id}")]
        public ActionResult<FPModel> Post(int id)
        {
            var emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == id);
            if (emp == null) return NotFound();
            else return new FPModel { value = emp.Fingerprint };
        }
        [HttpPost("std/{id}")]
        public ActionResult<FPModel> PostStd(int id)
        {
            var std = _context.Students.FirstOrDefault(x => x.StudentId == id);
            if (std == null) return NotFound();
            else return new FPModel { value = std.Fingerprint };
        }
        // PUT: api/EmployeeFP/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] string value)
        {
            Debug.WriteLine(value);
            var emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == id);
            if (emp == null) return NotFound();
            emp.Fingerprint = value;
            _context.SaveChanges();
            return NoContent();
        }
        [HttpPut("std/{id}")]
        public ActionResult PutStudent(int id, [FromBody] string value)
        {
            Debug.WriteLine(value);
            var std = _context.Students.FirstOrDefault(x => x.StudentId == id);
            if (std == null) return NotFound();
            std.Fingerprint = value;
            _context.SaveChanges();
            return NoContent();
        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
