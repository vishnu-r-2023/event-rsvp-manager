import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/app/lib/db";
import Admin from "@/app/model/Admin";
import User from "@/app/model/User";

export const handler = NextAuth({
  providers: [
    GitHubProvider({
      id: "github-admin", // custom provider ID
      clientId: process.env.GITHUB_CLIENT_ID_ADMIN,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_ADMIN,
    }),
    GitHubProvider({
      id: "github-user", // custom provider ID
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account.provider === "github-admin") {
        const existingAdmin = await Admin.findOne({ email: user.email });
        if (!existingAdmin) {
          await Admin.create({ name: user.name, email: user.email, image: user.image });
          console.log('Admin Created');
        }
        else
        {
            console.log('Admin Already Exists');
        }
      } else if (account.provider === "github-user") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({ name: user.name, email: user.email, image: user.image });
          console.log('User Created');
        }
        else{
            console.log('User Already Exists');
        }
      }
      return true;
    },
    async session({ session }) {
      await connectDB();
      const dbAdmin = await Admin.findOne({ email: session.user.email });
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbAdmin) {
        session.user.role = "admin";
      } else if (dbUser) {
        session.user.role = "user";
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
