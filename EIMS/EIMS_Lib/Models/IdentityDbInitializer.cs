using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.Models
{
    public class IdentityDbInitializer
    {
        private ApplicationDbContext db;

        public IdentityDbInitializer(ApplicationDbContext db) {
            this.db = db;
            
        }
        public async void Seed()
        {
            string[] roles =new string[] { "Admin", "Staff", "Parent", "Student" };
            //var roleStore = new RoleStore<IdentityRole>(db);
            foreach(string r in roles)
            {
                if(!db.Roles.Any(x=> x.Name == r))
                {
                    db.Roles.Add(new IdentityRole { Name = r, NormalizedName = r.ToUpper() });
                }
            }
           
            if (!db.Users.Any(x=> x.UserName == "Admin"))
            {
                var userStore = new UserStore<IdentityUser>(db);
                var hasher = new PasswordHasher<IdentityUser>();
                var user = new IdentityUser { UserName = "admin", NormalizedUserName="ADMIN"};
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Admin");
 
            }
            if (!db.Users.Any(x => x.UserName == "esad"))
            {
                var userStore = new UserStore<IdentityUser>(db);
                var hasher = new PasswordHasher<IdentityUser>();
                var user = new IdentityUser { UserName = "esad", NormalizedUserName = "esad" };
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Staff");

            }
            await db.SaveChangesAsync();
        }
    }
}
