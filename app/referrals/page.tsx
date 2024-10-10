
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { Button } from '@/components/ui/button'


export default async function IndexPage() {

  return (
    <div className=' flex flex-col w-full h-full'>
      <div className=' flex flex-col w-full h-full bg-[#ffffff] bg-opacity-[0.03] rounded-[48px] shadow-inner'>
        <h1 className='w-full  h-[75px] text-[#22FFF4] shadow-sm font-bold text-[28px] text-center py-6'>Leadboard</h1>
        <div className=' grow w-full overflow-auto '
        >



        </div>
      </div>
      <div className='bg-[#181818] bg-opacity-[0.18] shadow-referralLink rounded-full h-[42px]  mt-[22px] mx-[40px]'>

      </div>
    </div>


  )


}
