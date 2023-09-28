import React, { useState } from "react";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import CloseIcon from "@assets/icons/close-icon";
import { useSession, signOut } from "next-auth/react";
import { sidebarNavItems } from "@data/constant";

export default function MobileMenu() {
  const { closeSidebar } = useUI();
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="w-full bg-yellow/50 border-b border-yellow flex justify-between items-center relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
          <div role="button" onClick={closeSidebar} className="inline-flex">
            <Logo />
          </div>

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-5 py-5 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <CloseIcon className="mt-0.5" color="#000000" />
          </button>
        </div>
        {session && (
          <div className="border-b border-gray-200 py-4">
            <div className="text-center">
              <img
                className="rounded-md mx-auto"
                src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
                width={128}
                height={128}
                alt={session?.user?.name}
              />
              <p className="text-[18px] font-medium mt-1 uppercase ">
                {session?.user?.name}
              </p>
              <button
                type="button"
                className="my-2 py-[4px] px-[12px] bg-orange rounded-sm text-[14px] text-white "
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8 pt-4">
          <ul className="mx-3">
            {sidebarNavItems.map((item, idx) => (
              <li
                key={idx}
                className={`mb-1 last:mb-0   ${
                  pathname === `${item.href}`
                    ? "bg-slate-700 text-white"
                    : "text-rose-700"
                }`}
                onClick={closeSidebar}
              >
                <Link href={item.href} className="flex px-3 font-medium py-2">
                  {item.icon}
                  <span className="font-medium block ml-2">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
