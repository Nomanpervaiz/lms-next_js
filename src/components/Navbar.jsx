import Link from "next/link";
import { auth, signOut } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function Navbar() {
    let session = await auth();



    return (
        <nav className="bg-gray-200 py-6 ">
            <div className="container flex  justify-between mx-auto items-center">
                <h1 className="bg-black font-bold text-white rounded-xl px-4 py-2 ">
                    LMS
                </h1>
                {session ? (
                    <div className="flex justify-center items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="border-none rounded-full outline-none">
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            session?.user?.image || "https://github.com/shadcn.png"
                                        }
                                    />
                                    <AvatarFallback>
                                        {session?.user?.name?.slice(0, 1) ||
                                            session?.user?.email?.slice(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white mr-14 rounded-xl outline-none border-none">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {session?.user?.role === "admin" ?
                                    <DropdownMenuItem className="rounded-xl mt-2 bg-black text-white">
                                        <Link href={"/admin/dashboard"}>Admin Panel</Link>
                                    </DropdownMenuItem> : ""
                                }
                                <DropdownMenuItem className="rounded-xl mt-2 bg-black text-white">
                                    <form
                                        action={async () => {
                                            "use server";
                                            await signOut("google");
                                        }}
                                    >
                                        <button type="submit " className="w-full font-semibold">
                                            Logout
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Link
                        href={"/signin"}
                        className="border bg-black text-white py-2 px-4 rounded-xl"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
