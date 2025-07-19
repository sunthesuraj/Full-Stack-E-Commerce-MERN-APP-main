/* eslint-disable react/jsx-key */
import { useState } from "react"
import { useSelector } from 'react-redux'
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../../utils/AxiosToastError';
import UploadBanner from "../../components/AdminDashboard/UploadBanner"
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from '../../provider/GlobalProvider';
import { FaPlusCircle } from "react-icons/fa";
import useMobile from '../../hooks/useMobile'

const HomeBanner = () => {

    const bannerImages = useSelector(state => state.banner.bannerImage)
    const [openAddBanner,setOpenAddBanner] = useState(false)
    const { fetchBanner } = useGlobalContext()
    const [ isMobile ] = useMobile()



    const handleDeleteBanner = async(id)=>{
        try {
          const response = await Axios({
            ...SummaryApi.deleteBanner,
            data : {
              _id : id
            }
          })
          if(response.data.success){
            toast.success("Banner deleted Successfully")
            if(fetchBanner){
              fetchBanner()
            }
          }
        } catch (error) {
          AxiosToastError(error)
        }
      }
    

  return (
    <div className='p-0'>
        <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center mb-3'>
            <h2 className='heading px-4 line-clamp-1'>Home Page Banners</h2>
            <div>
            {
                isMobile ? (
                    <FaPlusCircle 
                        size={30} 
                        className='cursor-pointer text-secondaryColor'
                        onClick={()=>setOpenAddBanner(true)}
                    />
                ) : ( 
                    <button onClick={()=>setOpenAddBanner(true)} className='btn'>
                        Add Banner
                    </button>
                )
            }
            </div>
            
        </div>

        <div className=' p-2 flex flex-col gap-2 '>
            {
                bannerImages.map((banner)=>{
                  return(
                      <div className={`border rounded p-3 flex gap-3 bg-white`}>
                          <div className='w-full'>
                            <img src={banner.image} className='w-full h-60 object-scale-down' alt="banner"/>
                          </div>
                          <div className=' flex gap-2 items-center'>
                            <button onClick={()=>handleDeleteBanner(banner._id)} 
                                    className='bg-red-200 p-2.5 h-10 w-10 rounded-lg hover:text-white hover:bg-red-600'>
                                <MdDelete size={20}/> 
                            </button>
                          </div>
                      </div>
                  )
                })
            }

        </div>

        {
            openAddBanner && (
              <UploadBanner close={()=>setOpenAddBanner(false)}/>
            )
        }
    </div>
  )
}

export default HomeBanner