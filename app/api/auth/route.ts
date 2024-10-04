import { encrypt, SESSTION_DURATION } from "@/utils/session";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import { console } from "inspector";
import { init } from "next/dist/compiled/webpack/webpack";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { initData } = await request.json()
  const validationResult = validateTelegramWebAppData(initData)
  if (validationResult.validatedData) {
    console.log('Validation result:', validationResult)
    const user = { telegramId: validationResult.user.id }

    // create new session

    const expires = new Date(Date.now() + SESSTION_DURATION)
    const session = await encrypt({ user, expires })

    // save the sesstion in a cookie
    // cookies().set('session', session, { expires, httpOnly: true })
    return NextResponse.json({ message: 'Authentication successful' });

  } else {
    return NextResponse.json({ message: validationResult.message }, { status: 401 })
  }
}