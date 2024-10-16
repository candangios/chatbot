import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-sm md:px-2.5">{children}</div>
  )
}

export default MaxWidthWrapper
