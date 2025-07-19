/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../Divider'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import { logout } from '../../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError'
import isAdmin from '../../utils/isAdmin'
import profileIcon from "../../assets/ProfileIcon.svg"

import { MdOutlineCategory } from "react-icons/md";
import { TiUpload } from "react-icons/ti";
import { AiOutlineProduct } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }

  
  return (
    <div>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:cursor-pointer'>
        <div className='flex items-center h-[120px]'>
          <div className='flex items-center'>
            <img src={profileIcon} alt="" />
          </div>
          <div className='pl-4 flex flex-col items-start gap-1'>
            <div className='text-[18px] text-gray-900 text-bold'>{user.name} </div>
            <div className='text-[16px] text-gray-400' >{user.mobile}</div>
            <div className='text-sm text-red-500'>
              {user.role === "ADMIN" ? "(Admin)" : "" }
            </div>  
          </div>
        </div>
        </Link>

        <Divider/>
        <Divider/>

        <div className='flex flex-col gap-2'>

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/home-banner"}>
                <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10'>
                  <IoImageOutline size={25} />
                  <div className='text-[16px] ml-5'>Home Banner</div>
                </div>
                </Link>
                
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"}>
                <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10'>
                  <MdOutlineCategory size={25} />
                  <div className='text-[16px] ml-5'>Category</div>
                </div>
                </Link>
                
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"}>
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10'>
                  <MdOutlineCategory size={25} />
                  <div className='text-[16px] ml-5 '>Sub Category</div>
                </div>
                </Link>
              )
            }

            {
              user.isSeller && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"}>
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                  <TiUpload size={25} />
                  <div className='text-[16px] ml-5'>Upload Product</div>
                  </div>
                </Link>
              )
            }

            {
              user.isSeller && (
                <Link onClick={handleClose} to={"/dashboard/product-seller"} >
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                    <AiOutlineProduct size={25} />
                    <div className='text-[16px] ml-5'>My Products</div>
                  </div>
                </Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} >
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                    <AiOutlineProduct size={25} />
                    <div className='text-[16px] ml-5'>Product</div>
                  </div>
                </Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/all-orders"} >
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                    <IoBagHandleOutline size={25} />
                    <div className='text-[16px] ml-5'>All Orders</div>
                  </div>
                </Link>
              )
            }

            {
              user.isSeller && (
                <Link onClick={handleClose} to={"/dashboard/order-seller"} >
                  <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                    <AiOutlineProduct size={25} />
                    <div className='text-[16px] ml-5'>Orders For You</div>
                  </div>
                </Link>
              )
            }

            <Link onClick={handleClose} to={"/dashboard/myorders"}>
              <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                <IoBagHandleOutline size={25} />
                <div className='text-[16px] ml-5'>My Orders</div>
              </div>
            </Link>

            <Link onClick={handleClose} to={"/dashboard/address"}>
              <div className='flex pl-5 gap-2 items-center w-full hover:bg-primaryColor hover:text-white h-10 '>
                <IoLocationOutline size={25} />
                <div className='text-[16px] ml-5'>Addresses</div>
              </div>
            </Link>

        </div>

        <Divider />
        <Divider />

        <button onClick={handleLogout} className='text-center mt-8 w-full hover:bg-primaryColor hover:text-white h-10'>Log Out</button>
    </div>
  )
}

export default UserMenu
