import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import {  useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data,setData] = useState({
    email : "",
    newPassword : "",
    confirmPassword : ""
  })
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const valideValue = Object.values(data).every(el => el)

  useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/")
    }

    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email : location?.state?.email
            }
        })
    }
  },[])

  const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

  console.log("data reset password",data)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    ///optional 
    if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same.")
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.resetPassword, //change
            data : data
        })
        
        if(response.data.error){
            toast.error(response.data.message)
        }

        if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
            
        }

    } catch (error) {
        AxiosToastError(error)
    }



}

  return (
    <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <h3 className="text-gray-900 text-[22px] leading-9 font-bold mb-10">
                    Reset Your <span className="text-primaryColor"> Password </span>
                </h3>
                <form className="py-4 md:py-0" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor='newPassword'>New Password :</label>
                        <div className='flex items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                                required
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter your new password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor='confirmPassword'>Confirm Password :</label>
                        <div className='flex items-center'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='password'
                                className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                                required
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
             
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }    w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>Change Password</button>

                </form>
            </div>
        </section>
  )
}

export default ResetPassword
