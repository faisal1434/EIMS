using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class StudentNameVM
    {
        public int StudentId { get; set; }

        public string StudentName { get; set; }
        public string DisplayName { get => $"{StudentId}-{StudentName}"; }
    }
}
