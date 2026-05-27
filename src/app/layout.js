import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mango Books | Online Borrowing Platform",
  description: "A seamless and modern web application to explore and borrow books digitally.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}