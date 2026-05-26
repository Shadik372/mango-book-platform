import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongodb";
import clientPromise from "./db";

// We await the client connection and select the database
const client = await clientPromise;
const db = client.db("mango_books"); // You can name this whatever you like

export const auth = betterAuth({
  database: mongodbAdapter(db),
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