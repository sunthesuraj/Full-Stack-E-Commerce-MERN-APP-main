import {Link} from 'react-router-dom';
import logo from "../../assets/quickbuy-logo.png";
import {RiLinkedinFill} from 'react-icons/ri';
import {AiFillGithub} from 'react-icons/ai';
import appStore from '../../assets/app-store.svg';
import playStore from '../../assets/play-store.svg';

const socialLinks = [
  
  {
    path:"https://github.com/sunthesuraj",
    icon: <AiFillGithub className='group-hover:text-white group-hover:bg-[#7B22FA] w-4 h-5'/>
  },
  
  {
    path:"https://www.linkedin.com/in/suraj-singh-194489154/",
    icon: <RiLinkedinFill className='group-hover:text-white group-hover:bg-[#7B22FA] w-4 h-5'/>
  },
];

const quickLinks01 = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path : '/',
    display :'About Us'
  },
  {
    path : '/all-category',
    display : 'Categories'
  },
  {
    path : '/wishlist',
    display : 'Wishlist'
  },
];

const quickLinks02 = [
  {
    path : '/partner',
    display :'Partner'
  },
  {
    path : '/deliver',
    display :'Deliver'
  },
  {
    path : '/seller',
    display :'Seller'
  },
  {
    path : '/warehouse',
    display :'Warehouse'
  },
  {
    path : '/tech-team',
    display :'Join our tech team'
  }
];


const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 pt-10 bg-gradient-to-t from-[#ECDCFF] to-white'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src={logo} alt="" className='w-[120px] h-[45px] md:w-[200px] md:h-[70px]'/>
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
              Copyright @ {year} developed by Suraj Singh.. all right reserved.
            </p>
            <p className='text-[16px] leading-7 font-semibold text-textColor mt-4'>
              Contact Developer : 
            </p>

            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link,index)=>(
                <Link to={link.path} key={index}
                      className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center
                      justify-center group hover:bg-primaryColor hover:border-none'>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item,index)=>(
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              Career With Us
            </h2>

            <ul>
              {quickLinks02.map((item,index)=>(
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              Download App
            </h2>

            <div className="flex lg:flex-col justify-center gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.example.app"
                   className="bg-gray-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg"
                >
                    <img src={playStore} alt="Google Play Store" className="w-6 h-6 inline-block mr-2" />
                    Get it on Google Play
                </a>
                <a href="https://apps.apple.com/app/id123456789"
                   className="bg-gray-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
                >
                    <img src={appStore} alt="Apple App Store" className="w-6 h-6 inline-block mr-2" />
                    Get it on the App Store
                </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
export default Footer;
