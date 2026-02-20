'use client'

export default function AboutAgent() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">About Our Agent</h2>
            <p className="text-gray-700 text-lg mb-4">
              With over 15 years of experience in the real estate industry, our dedicated agent has helped hundreds of clients find their perfect property. We pride ourselves on providing exceptional service and expert guidance throughout the buying and selling process.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              Our mission is to make real estate transactions smooth, transparent, and rewarding for every client. We believe in building long-term relationships based on trust and integrity.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-secondary text-2xl">✓</span> Expert market knowledge
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary text-2xl">✓</span> Personalized service
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary text-2xl">✓</span> Fast closing process
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary text-2xl">✓</span> Competitive pricing
              </li>
            </ul>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
              alt="Real Estate Agent"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
