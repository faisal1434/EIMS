using EIMS_Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EIMS_Lib.ViewModels
{
    public class StudentViewModel
    {
        public int StudentId { get; set; }
        
        public string StudentName { get; set; }
        
        public string Roll { get; set; }
        
        
        public int SectionId { get; set; }

        public string SectionName { get; set; }
        public int ClassId { get; set; }

        public string ClassName { get; set; }
    }
}
