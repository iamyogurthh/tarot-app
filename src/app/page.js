import UserInputForm from '@/components/UserInputForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen p-[24px]">
      {/* Top-right History Button */}
      <div className="flex justify-end">
        <Link
          href="/history"
          className="bg-[#9799f543] px-[32px] py-[8px] rounded-[24px] font-bold shadow-lg text-dark_p"
        >
          History
        </Link>
      </div>

      {/* Centered Content */}
      <div className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Image
          src="/logo.png"
          alt="logo"
          width={241}
          height={139}
          className="object-cover mb-[16px] animate-float"
        />
        <UserInputForm />
      </div>
    </div>
  )
}
