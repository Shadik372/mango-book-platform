import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Mango Books Home</h1>
      
      <div className="flex gap-4">
        <Link href="/books" className="text-blue-500 hover:underline">All Books</Link>
        <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
        <Link href="/profile" className="text-blue-500 hover:underline">Profile</Link>
        {/* Test the dynamic route with a dummy ID */}
        <Link href="/books/123" className="text-blue-500 hover:underline">Test Book 123</Link>
      </div>
    </main>
  );
}