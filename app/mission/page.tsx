import Image from 'next/image'

export default async function IndexPage() {
  return (
    <div className=" flex flex-col w-full h-full">
      <div className=" flex flex-col w-full h-full bg-[#ffffff] bg-opacity-[0.03] rounded-[48px] shadow-referralLinkBg">
        <div className="relative -full  h-[65px] mt-[20px]">
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            src="./leaderboard.svg"
            width={200}
            height={55}

            priority={false}
            alt=""
          />
          <h1 className=" relative text-[#22FFF4] drop-shadow-title font-outfit font-bold text-[28px] text-center  z-100">
            Missions
          </h1>
        </div>

        <div className=" grow w-full overflow-auto px-7 "></div>
      </div>
    </div>
  )
}
