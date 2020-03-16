import { NavItem } from './nav-item';


export class ApiConfig {
  static apiBaseUrl = 'http://localhost:59313';
  static navItems: NavItem[] = [
    {
      label: 'Academic',
      icon: 'horizontal_split',
      items: [
        {
          label: 'Stubs',
          icon: 'picture_in_picture',
          items: [
            {
              label: 'Subjects',
              link: '/subjects',
              icon: 'menu_book'
            },
            //{
            //  label: 'Shift',
            //  link: '/shift',
            //  icon: 'view_carousel'
            //},
            {
              label: 'Periods',
              link: '/class-periods',
              icon: 'schedule'
            }
          ]
        },
        {
          label: 'Planning',
          icon: 'repeat',
          items: [
            
            //{
            //  label: 'Vacations',
            //  link: '/holidays',
            //  icon: 'explore'
            //},
            {
              label: 'Holidays',
              link: '/holidays',
              icon: 'work_off'
            },
            {
              label: 'Routine',
              icon: 'work_outline',
              link: '/'
            }

          ]
        },
        {
          label: "Class/Section",
          icon: 'vertical_split',
          items: [
            {
              label: 'Class',
              link: '/academic-class',
              icon: 'class'
            },
            {
              label: 'Section',
              link: '/sections',
              icon: 'border_all'
            }
          ]
        },
        {
          label: 'Assesment',
          icon: 'local_activity',
          items: [
            {
              label: 'Exam',
              icon: 'local_library',
              link: '/'
            },
            {
              label: 'Result',
              icon: 'school',
              link: '/'
            }
          ]
        },
        {
          label: 'Calendar',
          icon: 'date_range',
          link: '/calendar'
        }
      ]
    },
    {
      label: 'Resources',
      icon: 'business',
      items: [
        {
          label: 'Students',
          link: '/students',
          icon: 'supervised_user_circle'
        },
        {
          label: 'Teachers',
          
          icon: 'supervisor_account',
          items: [
            {
              label: 'Teacher List',
              link: '/teachers',
              icon: 'record_voice_over',
            },
            {
              label: 'Teacher Qualifications',
              link: '/qualifications',
              icon: 'school'
            },
            {
              label: 'Teacher Subject',
              link: '/teacher-subject',
              icon: 'sync_alt'
            }
          ]
        },
        {
          label: 'Employees',
          link: '/employees',
          icon: 'assignment_ind'
          
        },
        {
          label: 'Class Rooms',
          icon: 'layers',
          link: '/rooms'
        }
      ]
    },
    
    {
      label: 'Attendance',
      icon: 'fingerprint',
      items: [
        {
          label: 'Student Attendance',
          icon: 'how_to_reg',
          link: '/misexpedientes'
        },
        {
          label: 'Teacher Attendance',
          icon: 'waves',
          link: '/todos'
        }
      ]
    },

    
  ];
}
