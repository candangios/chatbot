import React from 'react'
interface ReferralsLayouttProps {
  children: React.ReactNode
}

const MissionLayout = ({ children }: ReferralsLayouttProps) => {
  return (
    <div className="elative mx-[25px] pt-[31px] flex h-[calc(100vh_-_89px)] overflow-hidden">
      {children}
    </div>
  )
}

export default MissionLayout
