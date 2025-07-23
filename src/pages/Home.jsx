import React from 'react'
import Herosection from '../component/Herosection'
import TrustedSegment from '../component/TrustedSegment'
import BrandShowcase from '../component/BrandShowcase'
import PropertySegment from '../component/PropertySegment'
import HowItWorks from '../component/HowItWorks'
import GlassReviewCard from '../component/SingleCard'
import TestimonialSection from '../component/TestimonialSection'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | DwellX</title>
      </Helmet>
      <Herosection></Herosection>
      <section className='bg-gradient-to-br from-purple-50 via-white to-indigo-50 pt-40 md:py-16'>
        <TrustedSegment></TrustedSegment>
        <BrandShowcase></BrandShowcase>
      </section>
      <section id="properties">
        <PropertySegment></PropertySegment>
      </section>
      <section className="relative bg-gradient-to-r from-[#f5f6fb] to-white py-14 overflow-hidden">

{/* Top-left soft pink overlay */}
<div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-pink-200/30 via-transparent to-transparent z-0 pointer-events-none" />

{/* Top-right soft blue overlay */}
<div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-200/30 via-transparent to-transparent z-0 pointer-events-none" />

{/* Bottom shadow fade-up */}
<div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-indigo-200/20 via-transparent to-transparent z-0 pointer-events-none" />

{/* Main content (above shadow layers) */}
<div className="relative z-10">
  <HowItWorks />
  <GlassReviewCard />
  <TestimonialSection />
</div>
</section>
      <section>
      
      </section>
    </div>
    
  )
}

export default Home