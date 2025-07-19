import { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/quickbuy-logo.png";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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

        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <h3 className="text-primaryColor text-[22px] leading-9 font-bold mb-10">
                    Welcome to <img className='center' src={logo}/>
                </h3>

                <form className="py-4 md:py-0" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor='name'>Name :</label>
                        <input
                            type='text'
                            id='name'
                            className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                            required
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
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
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='password'>Password :</label>
                        <div className='flex items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                        focus:border-b-primaryColor-200 text-[16px] leading-7 text-gray-700 
                                        placeholder:text-gray-400 cursor-pointer"
                                required
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
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
                                id='confirmPassword'
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

                    <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }    w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>
                        Create an Account
                    </button>

                </form>
                
                <p className="mt-5 text-textColor text-center">
                    Already have an account? 
                    <Link to="/login" className="text-primaryColor font-medium ml-1 hover:text-primaryColor-dark">Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register
