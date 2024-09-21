"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const session = useSession();

    return(
        <div className="flex flex-row items-center justify-between">
            <div>
                <Link href="/">
                    <p className="text-lg cursor-pointer hover:underline">
                        Eth Stream
                    </p>
                </Link>
            </div>
            <div>
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
                                Sign In
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;