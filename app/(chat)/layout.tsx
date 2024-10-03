import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="max-w-[600px] mx-auto h-[100vh] overflow-hidden" >
      <SidebarDesktop />
      {children}

    </div>
  )
}
