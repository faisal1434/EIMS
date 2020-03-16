using EIMS_Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class HolidayViewModel
    {
        public int HolidayId { get; set; }
        
        public DateTime HolidayDate  { get; set; }
      
        public HolidayType HolidayType { get; set; }
        
        public DateTime Upto { get; set; }
       
        public string Description { get; set; }
    }
}
