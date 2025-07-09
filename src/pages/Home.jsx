import React from 'react'
import Herosection from '../component/Herosection'
import TrustedSegment from '../component/TrustedSegment'
import BrandShowcase from '../component/BrandShowcase'
import PropertySegment from '../component/PropertySegment'
import HowItWorks from '../component/HowItWorks'
import GlassReviewCard from '../component/SingleCard'
import TestimonialSection from '../component/TestimonialSection'

const Home = () => {
  return (
    <div>
      <Herosection></Herosection>
      <section className='bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-16'>
        <TrustedSegment></TrustedSegment>
        <BrandShowcase></BrandShowcase>
      </section>
      <section>
        <PropertySegment></PropertySegment>
      </section>
      <section className='bg-gradient-to-r from-[#f6f7fb] to-white py-14'>
        <HowItWorks></HowItWorks>
        <GlassReviewCard></GlassReviewCard>
        <TestimonialSection></TestimonialSection>
      </section>
      <section>
      
      </section>
    </div>
    
  )
}

export default Home