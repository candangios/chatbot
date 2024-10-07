'use client'

import { init } from "next/dist/compiled/webpack/webpack"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { set } from "zod"

const TelegramAuth = () => {
  const [isAuthentication, setIsAuthentication] = useState(false)
  const [msgError, setmsgError] = useState('')
  const router = useRouter()
  useEffect(() => {

  }, [])

  const checkAuth = async () => {
    const response = await fetch('/api/sesstion')
    if (response.ok) {
      setIsAuthentication(true)
    }
  }
  const authenticateUser = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    WebApp.ready()
    const initData = WebApp.initData
    if (initData) {
      setmsgError(JSON.stringify({ initData }).toString())
      // try {
      //   const response = await fetch('/api/auth', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ initData })
      //   })


      //   if (response.ok) {
      //     setIsAuthentication(true)
      //     router.refresh()
      //   } else {
      //     const res = await response.json()
      //     setmsgError(JSON.stringify(res))
      //     console.log('Authentication failed')
      //     setIsAuthentication(false)
      //   }

      // } catch (error) {

      //   console.error('Authentication failed', error)
      //   setmsgError('Authentication failed')
      //   setIsAuthentication(false)
      // }
    }
  }
  return (
    <div className="flex flex-col items-center space-y-4 p8">
      {msgError && (<>{msgError}</>)}
      {isAuthentication ? (
        <>
          <p>Authentication!</p>
          <button onClick={() => router.push('/protected')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Access Protected page
          </button>

        </>
      ) : (
        <>
          <p>
            you need to be an owner of this account
          </p>
          <button onClick={authenticateUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Authenticate
          </button>
        </>
      )}
    </div>
  )
}

export default TelegramAuth