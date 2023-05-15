// google auth provider implementation

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      //serverless lambda function ->dynamodb
      //profile is the data that we get from google
      // console.log(profile);
      try {
        await connectToDB();

        const userExits = await User.findOne({ email: profile.email }); //finsind the user in the database

        if (!userExits) {
          await User.create({
            email: profile.email,
            name: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
        //check if the user already exists in the database
        //if not, create a new user and save to database
        return true;
      } catch (error) {
        console.log(error);
        //return signIn();
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST }; // this GET and POST is the same as the one in the route.js file
