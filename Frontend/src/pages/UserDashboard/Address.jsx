/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../../components/UserDashboard/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../../components/UserDashboard/EditAddressDetails';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../../utils/AxiosToastError';
import { useGlobalContext } from '../../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Removed Successfully")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
   
    <div className='p-0'>
        <div className='bg-white shadow-lg md:p-2 flex justify-between gap-4 items-center mb-3'>
            <h2 className='heading px-2 md:px-4 line-clamp-1 '>Saved Addresses</h2>
            <button onClick={()=>setOpenAddress(true)} className='btn hidden md:block'>
                Add Address
            </button>
            
        </div>

          <div className=' p-2 flex flex-col gap-2 '>
            {
                addressList.map((address)=>{
                  return(
                      <div className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                          <div className='w-full'>
                            <p>{address.address_line}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.country} - {address.pincode}</p>
                            <p>{address.mobile}</p>
                          </div>
                          <div className=' grid gap-10'>
                            <button onClick={()=>{
                              setOpenEdit(true)
                              setEditData(address)
                            }} className='bg-green-200 p-3 h-10 w-10 rounded-full  hover:text-white hover:bg-green-600'>
                              <MdEdit/>
                            </button>
                            <button onClick={()=>
                              handleDisableAddress(address._id)
                            } className='bg-red-200 p-2.5 h-10 w-10 rounded-lg hover:text-white hover:bg-red-600'>
                              <MdDelete size={20}/>  
                            </button>
                          </div>
                      </div>
                  )
                })
              }
          </div>

          <div className='text-center m-4 md:hidden'>
            <button className='btn' onClick={()=>setOpenAddress(true)}>Add Address</button>
          </div>
          {
            openAddress && (
              <AddAddress close={()=>setOpenAddress(false)}/>
            )
          }

          {
            OpenEdit && (
              <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
            )
          }


      </div>
  )
}

export default Address
