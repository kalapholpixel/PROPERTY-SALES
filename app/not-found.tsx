import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
