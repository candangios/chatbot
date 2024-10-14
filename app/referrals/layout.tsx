import React from 'react'
interface ReferralsLayouttProps {
  children: React.ReactNode
}

const ReferralsLayout = ({ children }: ReferralsLayouttProps) => {
  return (
    <div className="elative mx-1 pt-5 flex h-[calc(100vh_-_82px)] overflow-hidden">
      {/* <SidebarDesktop /> */}
      {children}
    </div>
  )
}

export default ReferralsLayout
