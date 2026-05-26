export default async function BookDetailsPage({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params; 
  
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Book Details</h1>
      <p>Viewing details for book ID: {resolvedParams.id}</p>
    </div>
  );
}