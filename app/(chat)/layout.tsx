import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="max-w-[600px] mx-auto   h-[calc(100vh_-_theme(spacing.16))] overflow-hidden my-4" >
      <SidebarDesktop />
      {children}

    </div>
  )
}
