import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-content1 border-t border-divider py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold">🥭 Mango Books</span>
          <p className="text-sm text-default-500 mt-2">
            Digitizing the traditional library experience.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-default-500">support@mangobooks.com</p>
          <p className="text-sm text-default-500">+880 1234-567890</p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" className="text-default-500 hover:text-primary">Facebook</Link>
            <Link href="#" className="text-default-500 hover:text-primary">Twitter</Link>
            <Link href="#" className="text-default-500 hover:text-primary">GitHub</Link>
          </div>
        </div>
        
      </div>
      <div className="text-center text-sm text-default-400 mt-8">
        &copy; {new Date().getFullYear()} Mango Books. All rights reserved.
      </div>
    </footer>
  );
}