import Link from "next/link";
import { auth, signOut } from "../../auth";

async function Navbar() {
    let session = await auth();
console.log("sesion in header==> ",session);

    return (
        <nav className="bg-gray-200 py-6 ">
            <div className="container flex  justify-between mx-auto items-center">
                <h1 className="bg-black font-bold text-white rounded-xl px-4 py-2 ">
                    LMS
                </h1>
                {session ? (
                    <div className="flex justify-center items-center">
                        <p>{session?.user?.email}</p>
                        <form
                            action={async () => {
                                "use server"
                                await signOut("google")
                            }}
                        >
                            <button type="submit " className="border bg-black text-white py-2 px-4 rounded-xl font-semibold">Logout</button>
                        </form>
                    </div>
                ) : (
                    <Link
                        href={"/signin"}
                        className="border bg-black text-white py-2 px-4 rounded-xl">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
