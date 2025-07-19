/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../../provider/GlobalProvider'

const EditAddressDetails = ({close, data}) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line :data.address_line,
            city : data.city,
            state : data.state,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile 
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data : {
                    ...data,
                    address_line :data.address_line,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            <div className='flex justify-between items-center gap-4'>
                <h2 className='heading'>Edit Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
            </div>
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressline' className="form_label">Address Line :</label>
                    <input
                        type='text'
                        id='addressline' 
                        className='form_input'
                        {...register("address_line",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city' className="form_label">City :</label>
                    <input
                        type='text'
                        id='city' 
                        className='form_input'
                        {...register("city",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state' className="form_label">State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='form_input'
                        {...register("state",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='pincode' className="form_label">Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='form_input'
                        {...register("pincode",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='country' className="form_label">Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='form_input'
                        {...register("country",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='mobile' className="form_label">Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='form_input'
                        {...register("mobile",{required : true})}
                    />
                </div>

                <button type='submit' className='bg-primary-200 w-full rounded-lg  py-4 font-semibold mt-4 hover:bg-primary-100'>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default EditAddressDetails

