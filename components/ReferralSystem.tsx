import React, { useEffect, useState } from 'react'
interface ReferralSystemProps {
  initData: string
  userId: string
  startParam: string
}

const ReferralSystem = ({
  initData,
  userId,
  startParam
}: ReferralSystemProps) => {
  const [referrals, setReferrals] = useState<string[]>([])
  const [referrer, setRefferrer] = useState<string | null>(null)
  const INVITE_URL = 'https://t.me/referral_showcase_bot/start'

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const respones = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrals: startParam })
          })
          if (!respones.ok) throw new Error('failed ti save referral')
        } catch (error) {
          console.error('Error saving referral', error)
        }
      }
    }

    const fetchReferrals = async () => {
      try {
        if (userId) {
          const respones = await fetch(`/api/referrals?userId=${userId}`)
          if (!respones.ok) throw new Error('failed to fetch referrals')
          const data = await respones.json()
          setReferrals(data.referrals)
          setRefferrer(data.referrer)
        }
      } catch (error) {}
    }
    checkReferral()
    fetchReferrals()
  }, [userId, startParam])

  const handleInviteFriend = () => {
    // const utils = initUtils();
    // const inviteLink = `${INVITE_URL}?startapp=${userId}`
    // const shareText = `Join me on this awesome Telegram mini app!`
    // const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
  }
  const handleCoppyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard')
  }
  return (
    <div className="w-full max-w-md">
      {referrer && (
        <p className="text-green-500 mb-5">
          You were referred buy user {referrer}
        </p>
      )}
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleInviteFriend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Invite Friend
        </button>
        <button
          onClick={handleCoppyLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          coppy Invite Link
        </button>
      </div>
      {referrals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Referrals</h2>
          <ul>
            {referrals.map((referral, index) => (
              <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                User:{referral}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ReferralSystem
