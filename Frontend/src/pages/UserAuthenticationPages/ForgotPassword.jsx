import  { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
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

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <h3 className="text-primaryColor text-[22px] leading-9 font-bold mb-10">
                    Forgot your Password? <span className="text-gray-900"> we&apos;ll send you OTP to help you reset your Password </span>  
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
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                        />
                    </div>
             
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }  w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}>Send Otp</button>

                </form>
            </div>
        </section>
    )
}

export default ForgotPassword


