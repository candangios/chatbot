import React from 'react'
interface ReferralsLayouttProps {
  children: React.ReactNode
}

const ReferralsLayout = ({ children }: ReferralsLayouttProps) => {
  return (
    <div className="elative mx-[25px] pt-[31px] flex h-[calc(100vh_-_82px)] overflow-hidden">
      {/* <SidebarDesktop /> */}
      {children}
    </div>
  )
}

export default ReferralsLayout
