
import { redirect } from "next/navigation"
import { signIn, auth } from "../../../auth"

export default async function SignIn() {

    let session = await auth()
    if (session) redirect("/")

    return (
        <section className="border h-dvh flex flex-col justify-center items-center">
            <div className="p-10 bg-gray-200 shadow-md w-full max-w-md rounded-xl flex flex-col justify-center items-center">
                <h1 className="font-bold text-4xl pb-8">
                    Login
                </h1>
                <form
                    className="flex flex-col "
                    action={async (formData) => {
                        "use server";
                        await signIn("credentials", formData, {redirect : false});
                      }}
                    >
                    <label className="font-semibold">
                        Email
                        <input name="email" required className="block w-80 bg-gray-50 rounded-xl p-2" type="email" />
                    </label>
                    <label className="font-semibold">
                        Password
                        <input name="password" required className="block w-80 bg-gray-50 rounded-xl p-2" type="password" />
                    </label>
                    <button type="submit" className="border py-2 px-4 mt-6 bg-blue-500 text-white w-40 mx-auto rounded-xl">Login</button>
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}>
                    <button type="submit " className="border bg-red-500 text-white py-2 px-4 rounded-xl mt-4 font-semibold">Continue with Google</button>
                </form>
            </div>
        </ section>
    )
}