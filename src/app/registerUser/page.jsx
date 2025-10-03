import UserInputForm from '@/components/UserInputForm'
import UserRegisterForm from '@/components/UserRegisterForm'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterUser() {
  return (
    <div className="relative min-h-screen p-[24px]">
      {/* Top-right History Button */}
      <div className="flex justify-end">
        <Link
          href="/dashboard"
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
          width={241}
          height={139}
          className="object-cover mb-[16px] animate-float"
        />
        <div className="animate-fade-in-up mb-[16px] bg-white px-[48px] py-[8px] rounded-[16px] shadow-lg border-[#9798F5] border-2 text-[#654597] font-bold">
          Register New User
        </div>
        <UserRegisterForm />
      </div>
    </div>
  )
}
