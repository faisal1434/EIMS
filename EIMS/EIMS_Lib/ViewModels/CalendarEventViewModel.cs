using EIMS_Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class CalendarEventViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public HolidayType Type { get; set; }
        public string Description { get; set; }
    }
}
