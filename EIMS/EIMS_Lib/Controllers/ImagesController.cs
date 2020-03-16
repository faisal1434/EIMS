using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EIMS_Lib.Models;
using EIMS_Lib.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EIMS_Lib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        IHostingEnvironment env;
        EimsDbContext db;
        public ImagesController(IHostingEnvironment env, EimsDbContext db)
        {
            this.env = env;
            this.db = db;
        }
        [HttpPost("{id}")]
        public async Task<ActionResult<ImagePathResponse>> PostImage(int id, IFormFile file)
        {
            var emp = await db.Employees.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Guid.NewGuid() + ext;
                if (!Directory.Exists(env.WebRootPath + "\\uploads\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\uploads\\");
                }
                using (FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\uploads\\" + f))
                {
                    file.CopyTo(filestream);
                    filestream.Flush();
                    emp.Picture = "/uploads/" + f;
                    await db.SaveChangesAsync();
                    return new ImagePathResponse { ImagePath = "/uploads/" + f};
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("Teacher/{id}")]
        public async Task<ActionResult<ImagePathResponse>> PostTeacherImage(int id, IFormFile file)
        {
            var emp = await db.Teachers.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Guid.NewGuid() + ext;
                if (!Directory.Exists(env.WebRootPath + "\\uploads\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\uploads\\");
                }
                using (FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\uploads\\" + f))
                {
                    file.CopyTo(filestream);
                    filestream.Flush();
                    emp.Picture = "/uploads/" + f;
                    await db.SaveChangesAsync();
                    return new ImagePathResponse { ImagePath = "/uploads/" + f };
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("Student/{id}")]
        public async Task<ActionResult<ImagePathResponse>> PostStudentImage(int id, IFormFile file)
        {
            var std = await db.Students.FindAsync(id);
            if (std == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Guid.NewGuid() + ext;
                if (!Directory.Exists(env.WebRootPath + "\\uploads\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\uploads\\");
                }
                using (FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\uploads\\" + f))
                {
                    file.CopyTo(filestream);
                    filestream.Flush();
                    std.Picture = "/uploads/" + f;
                    await db.SaveChangesAsync();
                    return new ImagePathResponse { ImagePath = "/uploads/" + f };
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}