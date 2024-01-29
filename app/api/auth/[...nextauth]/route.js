import User from "@schema/User";
import { connectDB } from "@utils/database";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authoptions = {
  secret: process.env.NEXT_AUTH_SECRET || "your_random_secret", // Replace "your_random_secret" with a secure random string
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks:{
    async session({ session }) {
      try {
       await connectDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
  
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
  
        return session;
      } catch (error) {
        console.error("Error in session:", error);
        throw error;
      }
    },
  
    async signIn({ profile }) {
      try {
       await connectDB();
        const userExist = await User.findOne({ email: profile.email });
  
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
  
        return true;
      } catch (error) {
        console.error("Error in signIn:", error);
        throw error;
      }
    },
  }

  
};

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
