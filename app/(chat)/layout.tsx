import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="elative mx-1 pt-5 flex h-[calc(100vh_-_82px)]" >
      {/* <SidebarDesktop /> */}
      {children}

    </div>
  )
}
