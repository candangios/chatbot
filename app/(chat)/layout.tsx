import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="w-ful flex justify-center h-[100vh] overflow-hidden">
      <SidebarDesktop />
      {children}
    </div>
  )
}
