import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import {  useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }

        } catch (error) {
            console.log('error',error)
            AxiosToastError(error)
        }



    }

    return (
        <section className="px-5 lg:px-0 bg-white">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10">
                <p className='text-primaryColor text-[22px] leading-9 font-bold mb-3'>Enter OTP</p>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='otp'></label>
                        <div className='flex items-center gap-1 justify-between mt-2'>
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                            key={"otp"+index}
                                            type='text'
                                            id='otp'
                                            ref={(ref)=>{
                                                inputRef.current[index] = ref
                                                return ref 
                                            }}
                                            value={data[index]}
                                            onChange={(e)=>{
                                                const value =  e.target.value
                                                console.log("value",value)

                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)

                                                if(value && index < 5){
                                                    inputRef.current[index+1].focus()
                                                }


                                            }}
                                            maxLength={1}
                                            className='bg-purple-100 h-[70px] w-full max-w-16 p-2 border rounded-full outline-none focus:border-primaryColor-dark text-center font-semibold'
                                        />
                                    )
                                })
                            }
                        </div>
                        
                    </div>
             
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-primaryColor hover:bg-primaryColor-dark" : "bg-gray-500" }  w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 mt-5`}>Verify OTP</button>

                </form>
            </div>
        </section>
    )
}

export default OtpVerification



