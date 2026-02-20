import Hero from '@/components/sections/Hero'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import AboutAgent from '@/components/sections/AboutAgent'
import Testimonials from '@/components/sections/Testimonials'
import { OrganizationSchema } from '@/components/StructuredData'

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <FeaturedProperties />
      <AboutAgent />
      <Testimonials />
    </>
  )
}
