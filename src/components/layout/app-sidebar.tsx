import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
// import { TeamSwitcher } from '@/components/layout/team-switcher'
import { sidebarData } from './data/sidebar-data'

// ✅ Ganti dengan 'react' jika bukan pakai Next.js

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  )

  return (
    <Sidebar collapsible='icon' variant='floating' {...props} className='pl-5'>
      <SidebarHeader>
        <Image
          src='/images/logo-pjb-pln.png' // ✅ Pastikan path-nya benar dan file ada di public/
          alt='PJB Logo'
          width={180}
          height={80}
        />
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
