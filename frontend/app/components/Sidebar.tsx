"use client";

import Link from "next/dist/client/link";
import link from "next/dist/client/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuLinks = [
    { label: "หน้าหลัก", href: "/home/dashboard" },
    { label: "รายการ", href: "/home/expenses" },
    { label: "รายงาน", href: "/home/reports" },
  ];

  const settingsLinks = [{ label: "การตั้งค่า", href: "/home/settings" }];

  const renderLink = (link: { label: string; href: string }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`w-full h-8 px-3 flex items-center text-[13px] rounded-lg whitespace-nowrap ${
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-background text-foreground-muted"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <div className="md:h-screen h-13 w-full md:w-50 md:px-5.5 md:py-4 px-5.5 flex md:flex-col flex-row items-center md:items-start md-gap-0 gap-4 bg-background-sidebar overflow-hidden">
      <div className="flex gap-2 ">
        <div className="w-7 h-7 bg-primary rounded-[7px]"></div>
        <p className="font-semibold whitespace-nowrap">Money Flow</p>
      </div>
      <div className="flex md:flex-col gap-1.5">
        <p className="mt-8.5 mb-2 text-[10px] text-foreground-subtle md:block hidden">
          เมนู
        </p>
        {menuLinks.map(renderLink)}
        <p className="mt-6.5 mb-2 text-[10px] text-foreground-subtle md:block hidden">
          ตั้งค่า
        </p>
        {settingsLinks.map(renderLink)}
      </div>
    </div>
  );
}
