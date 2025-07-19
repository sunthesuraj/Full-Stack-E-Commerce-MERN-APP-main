/* eslint-disable react/prop-types */
import { useState } from "react";
import uploadImage from '../../utils/UploadImage';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError';
import { IoClose } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { useGlobalContext } from '../../provider/GlobalProvider'

const UploadBanner = ({close}) => {
    const [data,setData] = useState({
        image : ""
    })
    const [loading,setLoading] = useState(false)
    const { fetchBanner } = useGlobalContext()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addBanner,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchBanner()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    const handleUploadBannerImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const { data : ImageResponse } = response

        setData(()=>{
            return{
                image : ImageResponse.data.url
            }
        })
    }


  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen flex items-center justify-center'>
            <div className='bg-white p-4 w-full max-w-lg  mx-auto rounded'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='heading'>Upload Home Banner</h2>
                    <button onClick={close} className='hover:text-red-500'>
                        <IoClose  size={25}/>
                    </button>
                </div>

                
                <form className='my-3 grid gap-3' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-60 flex items-center justify-center rounded'>
                                {
                                    data.image ? (
                                        <img
                                            alt='banner'
                                            src={data.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>
                                            <div className='w-20 h-20 flex items-center justify-center overflow-hidden drop-shadow-sm'>
                                                {   
                                                    <IoImageOutline size={65}/>
                                                }
                                            </div>
                                        </p>
                                    )
                                }
                            
                            </div>
                            <label htmlFor='selectBannerImage'>
                                <div  className="border-secondaryColor hover:bg-secondaryColor 
                                        px-4 py-2 rounded cursor-pointer border font-medium"
                                >
                                    Select Banner Image
                                </div>

                                <input onChange={handleUploadBannerImage} type='file' id='selectBannerImage' className='hidden'/>
                            </label>
                        
                        </div>

                        <button className={`${data.image  ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "} py-4 rounded-lg font-semibold `}>
                            Add Banner
                        </button>
                    </div>
                </form>
            </div>
    </section>
  )
}

export default UploadBanner