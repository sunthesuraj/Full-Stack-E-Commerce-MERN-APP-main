import { useSelector } from 'react-redux'
import  useMobile  from '../../hooks/useMobile'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeBanner = () => {
  const bannerImages = useSelector(state => state.banner.bannerImage)
  const [ isMobile ] = useMobile()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div>
    
    {
      isMobile ? (
        <div className='bg-green-700 mx-2 rounded-lg'>
            <p className='text-center text-[16px] text-white p-2 mb-6'>QuickBuy offers you the experience of Amazon with the speed of blinkIt</p>
            <p className="text-sm p-2 text-white text-center">
              Install app for Quick Access - <span 
                                                className='bg-orange-500 px-4 text-white rounded-lg' 
                                                href="https://play.google.com/store/apps/details?id=com.example.app"
                                              >Install
                                              </span>
            </p>
        </div>

      ):(
        <div className="home-banner-container">
          <Slider {...settings}>
            {bannerImages.map((banner, index) => (
              <div key={index}>
                <img src={banner.image} className="w-full h-30 lg:h-80 object-scale-down" /> 
              </div>
            ))}
          </Slider>
        </div>
      )
    }

  </div>
  );
};

export default HomeBanner;