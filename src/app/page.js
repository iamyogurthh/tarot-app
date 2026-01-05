import UserInputForm from '@/components/UserInputForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen p-[24px]">
      {/* Top-right History Button */}
      <div className="flex justify-end">
        <Link
          href="/adminlogin"
          className="bg-[#9799f543] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
        >
          Dashboard
        </Link>
      </div>

      {/* Centered Content */}
      <div className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Image
          src="/logo.png"
          alt="logo"
          width={251} // 241
          height={149} //139
          className="object-cover mb-[16px] animate-float"
        />
        <div className="text-2xl animate-fade-in-up mb-[16px] bg-white px-[48px] py-[8px] rounded-[16px] shadow-lg border-[#9798F5] border-2 text-[#654597] font-bold">
          Login
        </div>
        <UserInputForm />
      </div>
    </div>
  )
}
