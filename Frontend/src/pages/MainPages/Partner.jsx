import HomeBanner from '../../components/MainPages/HomeBanner'
import Testimonial from '../../components/MainPages/Testimonial'
import seller  from '../../assets/partner-express (2)_0.webp'
import delivery from '../../assets/partner-deliver.webp'
import joinTechTeam from '../../assets/partner-local.webp'
import warehouse from '../../assets/Isolation_Mode_0.webp'
import {Link} from 'react-router-dom';


const Partner = () => {
  return (
    <section className='bg-white 2xl:h-[800px] mx-2'>
        <div>
            <HomeBanner />
        </div>

        <div className='text-center mt-6'>
          <h1 className='heading'>Come build with us ...</h1>
          <p className='text_para'>We believe that our tech stack and operational backbone can empower thousands of local 
            entrepreneurs to serve the needs of millions of Indians. Our vision of a marketplace 
            where anyone can open their storefront on Quickbuy, will enable us to deliver anything 
            from groceries, to medicines, to beauty and health care products or even electronic items within minutes. For this we are looking for passionate entrepreneurs who want an opportunity to join the instant-commerce revolution in India. If this is exciting partner with us!</p>
        </div>

        <div className='text-center mt-6'>
          <h1 className='heading'>Opportunities to grow with QuickBuy</h1>
          <div className='grid lg:grid-cols-2 p-4 lg:p-8 gap-2 '>
            <div className='border rounded-lg shadow-lg bg-gradient-to-b from-[#ECDCFF] to-white'>
              <h1 className='heading text-center p-4'>Sell With Us</h1>
              <div className='flex gap-2'>
                <img src={seller} alt="" className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-scale-down'/>
                <div className='flex flex-col justify-between text_para p-2'>
                  <p className='text-left '>List your products on Blinkit and reach your customers in minutes</p>
                  <Link to='/seller' className='text-right'>Know more...</Link>
                </div>
              </div>
            </div>
            <div className='border rounded-lg shadow-lg bg-gradient-to-b from-[#ECDCFF] to-white'>
              <h1 className='heading text-center p-4'>Rent Your Property</h1>
              <div className='flex gap-2'>
                <img src={warehouse} alt="" className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-scale-down'/>
                <div className='flex flex-col justify-between text_para p-2'>
                  <p className='text-left '>Your property can become our next store!</p>
                  <Link to='/warehouse' className='text-right'>Know more...</Link>
                </div>
              </div>
            </div>
            <div className='border rounded-lg shadow-lg bg-gradient-to-b from-[#ECDCFF] to-white'>
              <h1 className='heading text-center p-4'>Delivery Partner</h1>
              <div className='flex gap-2'>
                <img src={delivery} alt="" className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-scale-down'/>
                <div className='flex flex-col justify-between text_para p-2'>
                  <p className='text-left '>Deliver items from a Blinkit partner store to customers</p>
                  <Link to='/deliver' className='text-right'>Know more...</Link>
                </div>
              </div>
            </div>
            <div className='border rounded-lg shadow-lg bg-gradient-to-b from-[#ECDCFF] to-white'>
              <h1 className='heading text-center p-4'>Join Our Tech Team</h1>
              <div className='flex gap-2'>
                <img src={joinTechTeam} alt="" className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-scale-down'/>
                <div className='flex flex-col justify-between text_para p-2'>
                  <p className='text-left '>Join our tech team and shape instant commerce</p>
                  <Link to='/tech-team' className='text-right'>Know more...</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
            <h1 className='heading text-center mt-6'> What Others Say About QuickBuy ... </h1>
            <Testimonial/>
        </div>
    </section>
  )
}

export default Partner