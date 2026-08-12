"use client";

import { signIn, signOut } from "next-auth/react";

//Icons
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden md:flex bg-foreground w-full h-full p-12"></div>
      <div className="flex flex-col justify-center items-center bg-background w-full h-full p-12">
        <div className="w-full max-w-sm">
          <div className="w-full mb-8">
            <p className="text-[11px] text-[#a3a89f]">ยินดีต้อนรับ</p>
            <p className="text-3xl text-foreground font-bold py-2">
              เข้าสู่ระบบ
            </p>
            <p className="text-sm text-[#6b7068]">
              เริ่มติดตามค่าใช้จ่ายของคุณ
              <br />
              ด้วย Google account ที่มีอยู่แล้ว
            </p>
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex w-full py-4 px-6 bg-foreground text-white rounded-xl  items-center justify-center gap-3 transition-colors btn-animated"
          >
            <Image
              src="https://thesvg.org/icons/google/default.svg"
              alt="Google"
              width={18}
              height={18}
            />
            <p>เข้าสู่ระบบด้วย Google</p>
          </button>
          <div className="my-8 w-full flex items-center gap-3">
            <div className="h-px bg-[#a3a89f]/40 w-full" />
            <p className="text-sm text-[#a3a89f] whitespace-nowrap">
              ทำไมต้อง Money Flow
            </p>
            <div className="h-px bg-[#a3a89f]/40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
