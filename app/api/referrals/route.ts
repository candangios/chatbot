import { getReferrals, getReferrer, saveReferral } from '@/lib/storage'
import { error } from 'console'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { userId, referralsId } = await request.json()

  if (!userId || !referralsId) {
    return NextResponse.json(
      { error: 'Missing userId or referralIf' },
      { status: 400 }
    )
  }
  saveReferral(userId, referralsId)
  return NextResponse.json({ success: true })
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  const referrals = getReferrals(userId)
  const referrer = getReferrer(userId)
  return NextResponse.json({ referrals, referrer })
}
