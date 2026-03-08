'use client';
import FullScreenLoader from '@/components/FullScreenLoader';
import UserRegisterForm from '@/components/UserRegisterForm';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterUser() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <FullScreenLoader text="ခေတ္တခဏစောင့်ဆိုင်းပေးပါ" />;

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
      <div className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-1000">
        <Image
          src="/logo.png"
          alt="logo"
          width={251}
          height={149}
          className="object-cover mb-[16px] animate-float"
        />
        <div className="text-2xl animate-fade-in-up mb-[16px] bg-white px-[48px] py-[8px] rounded-[16px] shadow-lg border-[#9798F5] border-2 text-[#654597] font-bold">
          Register New User
        </div>
        <UserRegisterForm setIsLoading={setIsLoading} />
      </div>
      {/*About us */}
      <div className=" animate-fade-in-up absolute bg-white border-[#9798f5] border-2 p-4 rounded-xl right-20 top-130">
        <div className="absolute top-[-300px] left-30  animate-fade-in-up">
          <Image src={'/major.png'} width={200} height={200} alt="major-logo" />
        </div>
        <p className=" mt-4 text-dark_p font-bold text-xl mb-4">
          Developed by CS Second Year Honours - Group 1
        </p>
        <ul className="text-xl">
          <li className="flex justify-between font-bold mb-3 text-red-500">
            <div>Mg Sai Eain Khant</div> <div>ဒုဂုဏ်ကသ-၃</div>
          </li>
          <li className="flex justify-between mb-3 font-semibold text-green-500">
            <div>Ma Thet Shwe Zin Kyaw</div> <div>ဒုဂုဏ်ကသ-၂</div>
          </li>
          <li className="flex justify-between mb-3 font-semibold text-orange-500">
            <div>Ma Myat Hnin Yadanar</div>
            <div>ဒုဂုဏ်ကသ-၆</div>
          </li>
          <li className="flex justify-between mb-3 font-semibold text-blue-500">
            <div>Ma May Zin Htun</div> <div>ဒုဂုဏ်ကသ-၉</div>
          </li>
        </ul>
      </div>

      <div className="absolute top-[300px] left-[-100px] animate-float">
        <Image src={'/cute.png'} width={900} height={900} alt="cute" />
      </div>
    </div>
  );
}
