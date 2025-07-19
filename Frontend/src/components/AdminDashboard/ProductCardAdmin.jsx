/* eslint-disable react/prop-types */
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../../common/SummaryApi'
import Axios from '../../utils/Axios'
import AxiosToastError from '../../utils/AxiosToastError'
import toast from 'react-hot-toast'
import ShowProductDetails from '../AdminDashboard/ShowProductDetails'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  
  const [showDetails, setShowDetails] = useState(false)
  const [openReject , setOpenReject] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const handleRejectCancel  = ()=>{
      setOpenReject(false)
      setRejectReason('') 
  }

  const handleProductApproval = async()=>{
    try {
      console.log(data._id)
      const response = await Axios({
        ...SummaryApi.approveProduct,
        data: {
          _id : data._id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleProductRejection = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.rejectProduct,
        data : {
          _id : data._id,
          rejectReason : rejectReason
        }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
          setOpenReject(false)
          setRejectReason('')
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleChange = (e) => {
    setRejectReason(e.target.value)
  }

  return (
    <div className='w-full p-4 bg-white rounded flex gap-2 items-center'>
        <div>
            <img
               src={data?.image[0]}  
               alt={data?.name}
               className='w-24 h-36 object-scale-down'
            />
        </div>
        <div className='w-full flex flex-col gap-2 p-2'>
            <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
            <p className='text-slate-400 line-clamp-2'>{data?.unit}</p>
            <p onClick={()=>setShowDetails(true)} className='text-right cursor-pointer'>Show details ...</p>

            {data?.status === 'pending' && (
              <div className='flex justify-between'>
                <button onClick={handleProductApproval} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Approve</button>
                <button onClick={()=>setOpenReject(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Reject</button>
              </div>
            )}
              
            {data?.status === 'approved' && (
              
              <div className='flex justify-between'>
                <p>Discontinue selling this product : </p>
                <button onClick={()=>setOpenReject(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Reject</button>
              </div>
            )}

            {data?.status === 'rejected' && (
              
                <p className='text-red-600'>Rejected : <span className='text-gray-700'> {data?.rejectReason } </span></p>
              
            )}

            
        </div>
        

        {
          showDetails && (
            <ShowProductDetails fetchProductData={fetchProductData} data={data} close={()=>setShowDetails(false)}/>
          )
        }

        {
          openReject && (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center '>
                <div className='bg-white p-4 w-full max-w-md rounded-md'>
                    <div className='flex items-center justify-between gap-4'>
                        <h3 className='font-semibold'>Why Reject ?</h3>
                        <button onClick={()=>setOpenReject(false)} className='hover:text-red-600'>
                          <IoClose size={25}/>
                        </button>
                    </div>
                    <div className="my-2">
                        <input
                            type='text'
                            id='rejectReason'
                            className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                            required
                            name='rejectReason'
                            value={rejectReason}
                            onChange={handleChange}
                            placeholder='Enter Reason for Rejection' 
                        />
                    </div>
                    <div className='flex justify-end gap-5 py-4'>
                      <button onClick={handleRejectCancel} className='border px-3 py-1 rounded bg-red-100 border-red-500 text-red-500 hover:bg-red-200'>Cancel</button>
                      <button onClick={handleProductRejection} className='border px-3 py-1 rounded bg-green-100 border-green-500 text-green-500 hover:bg-green-200'>Reject</button>
                    </div>
                </div>
            </section>
          )
        }
    </div>
    
  )
}

export default ProductCardAdmin
