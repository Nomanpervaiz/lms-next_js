import { connectDB } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { UserModel } from "@/lib/Models/UserModel";

const handleLogin = async (profile) => {
  
  await connectDB();
  const user = await UserModel.findOne({ email: profile?.email });
  if (user) {
    return user;
  } else {
    console.log(profile?.name);
    const obj = {
      name: profile?.name,
      email: profile?.email,
      provider: "Google",
      profileImg: profile?.picture,
    };
    let newUser = await new UserModel(obj);
    newUser = await newUser.save();
    return newUser;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        console.log("credentials", credentials);
        let res = await fetch( `${process.env.BASE_URL}api/users/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        res = await res.json();
        console.log("response ==> ", res.user);
        user = await res.user;
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account", account);

      if (account.provider == "google") {
        const user = await handleLogin(profile);
        return { ...profile, role: user?.role };
      }
      return true;
    },
    async jwt({ token }) {
      const user = await handleLogin(token);
      console.log("user in jwt ==>", user);
      token._id = user._id;
      token.role = user.role;
      token.image = user?.profileImg;
      token.name = user?.name;
      return token;
    },
    session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.profile = token.image;
      session.user.username = token.name;
      return session;
    },
  },
});
