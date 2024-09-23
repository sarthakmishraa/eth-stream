"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const session = useSession();

    return(
        <div className="my-4 px-20 pt-2 md:px-40 lg:px-60 flex flex-row items-center justify-between">
            <div>
                <Link href="/">
                    <p className="text-2xl cursor-pointer hover:underline">
                        Eth Stream
                    </p>
                </Link>
            </div>
            <div>
            <Link href="https://www.linkedin.com/in/sarthakmishraa/" target="_blank">
                <button
                    className="p-1 m-2 text-sm rounded-md border-2 bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                >
                    LinkedIn
                </button>
            </Link>
            <Link href="https://github.com/sarthakmishraa" target="_blank">
                <button
                    className="p-1 m-2 text-sm rounded-md border-2 bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                    >
                        GitHub
                </button>
            </Link>
            <Link href="https://sarthakmishraa.github.io/portfolio/" target="_blank">
                <button
                    className="p-1 m-2 text-sm rounded-md border-2 bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                    >
                        Portfolio
                </button>
            </Link>
                {
                    session.data?.user ? (
                        <button
                            className="p-1 m-2 text-sm rounded-md border-2 bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                            onClick={() => signOut()}>
                                Sign Out
                        </button>
                    ):(
                        <button
                            className="p-1 m-2 text-sm rounded-md border-2 bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                            onClick={() => signIn()}>
                                Sign Up
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;