import { connectMongoDB } from "@/libs/mongoConnect";
import {User} from '@/models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,

};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return false;
  }
  const userInfo = await User.findOne({ email });

  // const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }
  console.log(userInfo,userInfo?.__v,userInfo.admin,"yeh ha sab admin")

  return userInfo.__v;
}

const handler = NextAuth(authOptions);
const handler1 = NextAuth(authOptions);


export { handler as POST };
