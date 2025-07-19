import { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <h3 className="text-gray-900 text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor"> Welcome </span> Back 
                </h3>

                <form className="py-4 md:py-0" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor='email'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                            required
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor='password'>Password :</label>
                        <div className='flex items-center '>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                            focus:border-b-primaryColor text-[16px] leading-7 text-gray-700 
                                            placeholder:text-gray-400 cursor-pointer"
                                required
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your Password'
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
                        <div className='text-right hover:text-primary-200'>
                            <Link to={"/forgot-password"} >Forgot password ?</Link>
                        </div>
                        
                    </div>

    
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }    w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>Login</button>

                </form>

                <p className="mt-5 text-textColor text-center">
                    Don&apos;t have an account? 
                    <Link to="/register" className="text-primaryColor font-medium ml-1 hover:text-primaryColor-dark">Create here</Link>
                </p>
            </div>
        </section>
    )
}

export default Login


