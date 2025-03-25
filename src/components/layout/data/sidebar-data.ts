import {
  IconBug,
  IconBuildingCog,
  IconBuildings,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLockAccess,
  IconSettings,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'halim putra',
    email: 'halimputra@icloud.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Visitor Management',
          icon: IconChecklist,
          items: [
            {
              title: 'Visitor',
              url: '/visitor-management/visitors',
              icon: IconUsers,
            },
            {
              title: 'Company',
              url: '/visitor-management/companies',
              icon: IconBuildings,
            },
          ],
          
        },
        
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
          ],
        },
      ],
    },
    {
      title: 'Devices',
      items: [
        {
          title: 'Access Control',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
          ],
        },
      ],
    },
    {
      title: 'Internal',
      items: [
        {
          title: 'Departments',
          url: '/departments',
          icon: IconBuildingCog,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
