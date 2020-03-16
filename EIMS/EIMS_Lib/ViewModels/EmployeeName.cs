using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class EmployeeNameVM
    {
        public int EmployeeId { get; set; }
       
        public string EmployeeName { get; set; }
        public string DisplayName { get => $"{EmployeeId}-{EmployeeName}"; }


    }
}
