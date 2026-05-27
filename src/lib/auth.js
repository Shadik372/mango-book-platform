import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db";

const client = await clientPromise;
const db = client.db("mango_books"); 

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});