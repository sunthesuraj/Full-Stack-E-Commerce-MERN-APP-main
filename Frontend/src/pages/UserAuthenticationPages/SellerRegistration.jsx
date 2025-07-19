import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Link , useNavigate } from 'react-router-dom';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import fetchUserDetails from '../../utils/fetchUserDetails';
import { setUserDetails } from '../../store/userSlice';


const SellerRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state) => state.user); // Get user email
  
    const [formData, setFormData] = useState({
      email: email || '', // Pre-fill if logged in
      password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
  
    // ... rest of the component logic ...
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(formData).every(el => el)

    const handleRegister = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.registerAsSeller,
                data : formData
            })
            
            if (response.status === 400 && response.data.message === 'You are already registered as a seller.') {
                // User already a seller, redirect to upload product page
                navigate("/dashboard/upload-product"); 
            } else if (response.data.success) {
                toast.success(response.data.message);
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));
                navigate("/dashboard/upload-product");
            } else {
                toast.error(response.data.message);
                navigate("/seller-registration"); 
            }

        } catch (error) {
            AxiosToastError(error)
            navigate("/seller-registration")
        }

    }

    const handleLoginAndRegister = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : formData
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
                
                try {
                    const response = await Axios({
                        ...SummaryApi.registerAsSeller,
                        data : formData
                    })
                    
                    if (response.status === 400 && response.data.message === 'You are already registered as a seller.') {
                        // User already a seller, redirect to upload product page
                        navigate("/dashboard/upload-product"); 
                    } else if (response.data.success) {
                        toast.success(response.data.message);
                        const userDetails = await fetchUserDetails();
                        dispatch(setUserDetails(userDetails.data));
                        navigate("/dashboard/upload-product");
                    } else {
                        toast.error(response.data.message);
                        navigate("/seller-registration"); 
                    }
        
                } catch (error) {
                    AxiosToastError(error)
                    navigate("/seller-registration")
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }

    }

  
    return (
        <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <h3 className="text-gray-900 text-[22px] leading-9 font-bold mb-10">
                    Hello!! Register as A <span className="text-primaryColor"> Seller </span> with Us 
                </h3>
                {email ? (
                    <form className="py-4 md:py-0" onSubmit={handleRegister}>
                        <div className="mb-5">
                            <label htmlFor='email'>Email : {formData.email}</label>
                            
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
                                        value={formData.password}
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
                    
                        {/* Add other necessary fields for seller details */}
                        <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }    w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>
                            Register As Seller
                        </button>
                    </form>
                ) : (
                <>
                    <form className="py-4 md:py-0" onSubmit={handleLoginAndRegister}>
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
                                value={formData.email}
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
                                    value={formData.password}
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

    
                        <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }    w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>
                            Login And Register As Seller
                        </button>

                    </form>

                    <p className="mt-5 text-textColor text-center">
                        Don&apos;t have an account? 
                        <Link to="/register" className="text-primaryColor font-medium ml-1 hover:text-primaryColor-dark">Create here</Link>
                    </p>
                </>
            )}
            </div>
        </section>
    );
};
  
export default SellerRegistration