"use client";

import Link from "next/link";

export default function Home () {
  return (
    <div className="px-20 md:px-40 lg:px-60">
      <div className="flex flex-col items-center text-center space-y-4 my-10">
        <div>
          <p className="text-8xl my-10 leading-snug tracking-tighter font-bold">Eth Stream</p>
          <p className="text-lg my-10 leading-normal px-10">Experience the convenience of having the crypto market at your fingertips. Eth Stream's user-friendly dashboard provides a seamless way to track and analyze cryptocurrencies. Stay ahead of the curve and make informed trading decisions.</p>
        </div>
        <Link href="/dashboard" className="border-2 border-white p-2 m-2 rounded-full font-semibold bg-[aliceblue] text-[rgb(36,36,36)] hover:bg-[rgb(36,36,36)] hover:text-[aliceblue] transition-all">
          Get Started
        </Link>
      </div>
    </div>
  );
}
