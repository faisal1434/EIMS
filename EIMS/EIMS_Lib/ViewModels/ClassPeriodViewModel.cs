using EIMS_Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class ClassPeriodViewModel
    {
        public int ClassPeriodId { get; set; }

        public int ShiftId { get; set; }
        public ClassType ClassType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
