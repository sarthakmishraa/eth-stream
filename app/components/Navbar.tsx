"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const session = useSession();

    return(
        <div className="flex flex-row items-center justify-around">
            <div>
                <p>Eth Stream</p>
            </div>
            <div>
                {
                    session.data?.user ? (
                        <button
                            className="p-2 m-2 rounded-md border-2"
                            onClick={() => signOut()}>
                                Sign Out
                        </button>
                    ):(
                        <button
                            className="p-2 m-2 rounded-md border-2"
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