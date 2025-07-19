/* eslint-disable react/prop-types */
import { useState } from 'react'
import EditProductAdmin from '../AdminDashboard/EditProductAdmin'
//import CofirmBox from './CofirmBox'
import { IoClose , IoWarningOutline } from 'react-icons/io5'
import SummaryApi from '../../common/SummaryApi'
import Axios from '../../utils/Axios'
import AxiosToastError from '../../utils/AxiosToastError'
import toast from 'react-hot-toast'
import ShowProductDetails from '../AdminDashboard/ShowProductDetails'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [editOpen,setEditOpen]= useState(false)
  const [openDelete,setOpenDelete] = useState(false)

  const handleDeleteCancel  = ()=>{
      setOpenDelete(false)
  }

  const handleDelete = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
          setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className='w-full p-4 bg-white rounded'>
      {data?.status === 'pending' && (
        <div className='flex items-center gap-2 mb-2 p-2 bg-yellow-500 text-gray-900'>
          <IoWarningOutline className='inline'/> 
          <span>Pending for Approval. Will be reviewed within 3 business days.</span> 
        </div>
      )}

      {data?.status === 'rejected' && (
        <div className='flex items-center gap-2 p-2 mb-2  bg-red-500 text-gray-900'>
          <IoWarningOutline className='inline'/> 
          <span>Rejected: {data?.rejectReason}</span> 
        </div>
      )}

      {data?.status === 'approved' && data?.stock <= 10 && (
        <div className='flex items-center gap-2 p-2 mb-2 bg-orange-500 text-gray-900'>
          <IoWarningOutline /> 
          <span>Low Stock: {data?.stock} units remaining.</span> 
        </div>
      )}

      <div className='flex  gap-2'>
        <div>
            <img
               src={data?.image[0]}  
               alt={data?.name}
               className='w-24 h-36 object-scale-down'
            />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
          <p className='text-slate-400 line-clamp-2'>{data?.unit}</p>
          <p onClick={()=>setShowDetails(true)} className='text-right cursor-pointer text-slate-400'>Show details ...</p>


        {(data?.status === 'approved' && 'pending' )&& (
          <>
          <p className='text-slate-400 line-clamp-2'>Current Stock :  {data?.stock}</p>
          <div className='flex justify-between'>
            <button onClick={()=>setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
            <button onClick={()=>setOpenDelete(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Delete</button>
          </div>
          </>
        )}
        {data?.status === 'rejected' && (
          <button onClick={()=>setOpenDelete(true)} className='border px-8 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Delete</button>
        )}
        </div>
      </div>

        {
          showDetails && (
            <ShowProductDetails fetchProductData={fetchProductData} data={data} close={()=>setShowDetails(false)}/>
          )
        }
        
        {
          editOpen && (
            <EditProductAdmin fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)}/>
          )
        }

        {
          openDelete && (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center '>
                <div className='bg-white p-4 w-full max-w-md rounded-md'>
                    <div className='flex items-center justify-between gap-4'>
                        <h3 className='font-semibold'>Delete Permanently</h3>
                        <button onClick={()=>setOpenDelete(false)} className='hover:text-red-600'>
                          <IoClose size={25}/>
                        </button>
                    </div>
                    <p className='my-2'>Are you sure you want to delete product permanently ?</p>
                    <div className='flex justify-end gap-5 py-4'>
                      <button onClick={handleDeleteCancel} className='border px-3 py-1 rounded bg-red-100 border-red-500 text-red-500 hover:bg-red-200'>Cancel</button>
                      <button onClick={handleDelete} className='border px-3 py-1 rounded bg-green-100 border-green-500 text-green-500 hover:bg-green-200'>Delete</button>
                    </div>
                </div>
            </section>
          )
        }
    </div>
  )
}

export default ProductCardAdmin
