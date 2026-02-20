'use client'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      text: 'Excellent service! Found my dream home quickly and smoothly. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      text: 'Professional and knowledgeable. Made the entire process stress-free.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mike Davis',
      text: 'Great communication throughout. Very satisfied with the purchase.',
      rating: 4,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Client Testimonials</h2>
          <p className="text-gray-600 text-lg">What our satisfied clients say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-accent p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-bold text-primary">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
