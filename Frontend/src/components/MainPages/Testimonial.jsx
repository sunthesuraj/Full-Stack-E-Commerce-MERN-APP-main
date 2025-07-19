/* eslint-disable react/jsx-key */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {HiStar} from 'react-icons/hi'
import avatar from '../../assets/ProfileIcon.svg'
import Divider from '../Divider'

const Testimonial = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 768, // Adjust breakpoint as needed for phone screens
              settings: {
                slidesToShow: 1, 
                slidesToScroll: 1, 
              },
            },
        ],
    };

    const data = [
        {
            userImage : avatar,
            name : "Prakash Prasad",
            review : "QuickBuy has been a game-changer for my business! It's helped me reach a wider audience and connect with new customers I wouldn't have found otherwise"
        },
        {
            userImage : avatar,
            name : "Prakash Prasad",
            review : "I'm incredibly happy with the visibility QuickBuy has provided for my products. The platform is easy to use, and I've seen a significant increase in sales since joining"
        },
        {
            userImage : avatar,
            name : "Prakash Prasad",
            review : "My customers are happy with the quick and efficient delivery service offered by QuickBuy. It's helped me build strong customer relationships"
        },
        {
            userImage : avatar,
            name : "Prakash Prasad",
            review : "QuickBuy has been a fantastic platform for my business. I've received excellent feedback from customers about the quality of the products and the smooth delivery process"
        },
        {
            userImage : avatar,
            name : "Prakash Prasad",
            review : "I love the user-friendly interface and the helpful customer support. QuickBuy makes it easy for me to manage my online store and connect with customers"
        },
    ]

    

  return (

    <div className='w-3/4 m-auto'>
        <div className='mt-6'>
        <Slider {...settings}>
            {data.map((d)=>(
                <div className='py-[30px] px-5 rounded-3 border border-gray-400 rounded-lg shadow-lg shadow-[#ECDCFF] bg-gradient-to-b from-[#ECDCFF] to-white'>
                    
                    <p className='text-[16px] leading-7 mt-4 text-textColor font-[400] text-center'>{d.review}</p>
                    
                    <Divider/>
                    <Divider/>

                    <div className='flex items-center gap-2 mt-4'>
                        <img src={d.userImage} />
                        <div className='flex flex-col'>
                            <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">{d.name}</h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-secondaryColor w-[18px] h-5'/>
                                    <HiStar className='text-secondaryColor w-[18px] h-5'/>
                                    <HiStar className='text-secondaryColor w-[18px] h-5'/>
                                    <HiStar className='text-secondaryColor w-[18px] h-5'/>
                                    <HiStar className='text-secondaryColor w-[18px] h-5'/>
                                </div>
                        </div>
                    </div>
                    

                </div>
            ))}
        </Slider>
        </div>
    </div>

  )
}

export default Testimonial