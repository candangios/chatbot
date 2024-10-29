import { BASE_URL } from '@/config'
import { getReferrals, getReferrer, saveReferral } from '@/lib/storage'
import axios from 'axios'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { promptId, access_token, status } = await request.json()

  try {
    const res = await axios.post(
      `${BASE_URL}/telegram/prompt/status`,
      { promptId, status: status },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    return NextResponse.json({ success: true, status: res.data.data.status })

  } catch (error) {
    return NextResponse.json({ error: 'Error update status' }, { status: 400 })
  }

}

