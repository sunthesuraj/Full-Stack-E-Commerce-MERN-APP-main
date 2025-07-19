import { Link } from 'react-router-dom'
import sellerBanner from '../../assets/SellWithUsBanner.png'
import step1 from '../../assets/Step1.jpeg'
import step3 from '../../assets/Step3.jpeg'
import step4 from '../../assets/Step4.png'
import Divider from '../../components/Divider'
import Testimonial from '../../components/MainPages/Testimonial'
import  useMobile  from '../../hooks/useMobile'

const Seller = () => {
  const [ isMobile ] = useMobile()

  return (
    <section className='bg-white 2xl:h-[800px] mx-2'>
        {
            !isMobile ? (
                <div className='shadow-md'>
                    <img src={sellerBanner} className='w-full h-full object-scale-down'/>
                </div>
            ):(
                <div className='bg-green-700  rounded-lg'>
                    <p className='text-center text-[16px] text-white p-2 mb-6'>QuickBuy offers you the experience of Amazon with the speed of blinkIt</p>
                    <p className="text-sm p-2 text-white text-center">
                            Install app for Quick Access - <span 
                                                className='bg-orange-500 px-4 text-white rounded-lg' 
                                                href="https://play.google.com/store/apps/details?id=com.example.app"
                                            >Install</span>
                    </p>
                </div>
            )
        }

        <div className='border rounded-lg mt-6 mx-auto shadow-lg'> 
            <h1 className='heading text-[16px] lg:text-[30px] text-center mt-6'> How to sell On QuickBuy ? </h1>
            <h2 className='font-semibold text-[16px] lg:text-[22px] text-center mb-6'>Follow these 3 Easy Steps & Start Selling - </h2>
            <div className='flex flex-col justify-between px-20 lg:px-48 mb-6'>
                <div className='flex items-center justify-between'>
                    <img src={step1} className='h-[80px] w-[80px] lg:h-[200px] lg:w-[200px] object-scale-down'/>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px]'>STEP 1 : Register your account</h2>
                        <p className='text-[12px] lg:text-[16px]'>Register on QuickBuy with GST/PAN details and an active bank account</p>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px]'>STEP 2 : List your products</h2>
                        <p className='text-[12px] lg:text-[16px]'>List your products by providing product and brand details</p>
                    </div>
                    <img src={step3} className='h-[80px] w-[80px] lg:h-[200px] lg:w-[200px] object-scale-down'/>                   
                </div>

                <div className='flex items-center justify-between'>
                    <img src={step4} className='h-[80px] w-[80px] lg:h-[200px] lg:w-[200px] object-scale-down'/>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px]'>STEP 3 : Complete orders & get paid</h2>
                        <p className='text-[12px] lg:text-[16px]'>Deliver orders to customers on time and get paid within 7 days of delivery</p>
                    </div>
                </div>

            </div>
        </div>

        <div className='mt-6 mx-auto'>
            <h1 className='heading text-[16px] lg:text-[30px] text-center mt-6'> Why become a seller on  QuickBuy ? </h1>
            <div className='flex flex-col md:flex-row items-center mt-6 mb-6 gap-4 px-4'>
                    <div className='h-auto w-full flex flex-col border border-gray-400 rounded-lg py-4 px-4'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px] text-center'>Easy Registration Process</h2>
                        <Divider/>
                        <p className='text-[12px] lg:text-[16px]'>
                            It hardly takes a few minute to get youself register as seller on Quickbuy
                        </p>
                    </div>

                    <div className='h-auto w-full flex flex-col border border-gray-400 rounded-lg py-4 px-4'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px] text-center'>Lesser Selling Fee</h2>
                        <Divider/>
                        <p className='text-[12px] lg:text-[16px]'>QuickBuy charges lesser selling fee which helps our seller earn more </p>
                    </div>
                    
                    <div className='h-auto w-full flex flex-col border border-gray-400 rounded-lg py-4 px-4'>
                        <h2 className='font-semibold text-[14px] lg:text-[18px] text-center'>Unbeatable Reach</h2>
                        <Divider/>
                        <p className='text-[12px] lg:text-[16px]'>Deliver to 100% of India&apos;s serviceable pincodes, through Easy Ship & Fulfillment by QuickBuy.</p>
                    </div>
            </div>
        </div>

        
        <div className='text-center mt-6 mb-6 text-[16px] lg:text-[22px]'>
            <Link to={"/seller-registration"}>
                <button className='btn hover:shadow-primaryColor hover:shadow-lg mt-6 '> Start Selling </button>
            </Link>
        </div>


        

        <div>
            <h1 className='heading text-[16px] lg:text-[30px] text-center mt-6'> What Other Sellers Say About QuickBuy ... </h1>
            <Testimonial/>
        </div>
        
    </section>
  )
}

export default Seller