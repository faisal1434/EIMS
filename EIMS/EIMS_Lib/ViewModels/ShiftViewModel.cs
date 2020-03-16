using EIMS_Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class ShiftViewModel
    {
        public int ShiftId { get; set; }
        public ShiftType ShiftType { get; set; }
      
        public DateTime StartTime { get; set; }
   
        public DateTime EndTime { get; set; }
        
        public bool Active { get; set; }
    }
}
