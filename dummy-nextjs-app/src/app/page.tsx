import Link from "next/link"; // Import if using Next.js

export default function Home() {
  return (<div className="flex flex-col items-center mt-20">
            <h2 className="text-3xl font-bold mb-8">Welcome to the Home Page</h2>
            <p className="text-lg text-center mb-4">A simple application to generate AI images with Dall-E3 and add them to the gallery.</p>
            <p className="text-lg text-center mb-6">You can go to the gallery by clicking below:</p>
            
            <Link
                href="/gallery"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
            >
                Go to Gallery
            </Link>
        </div>
  );
}
