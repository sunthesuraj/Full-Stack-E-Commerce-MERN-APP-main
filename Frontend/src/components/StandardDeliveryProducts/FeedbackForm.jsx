/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import {AiFillStar} from "react-icons/ai";
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import Axios from '../../utils/Axios';
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";


const FeedbackForm = ({orderId , productId , close}) => {
  
  const {_id : userId } = useSelector((state)=>state.user)
  const [rating , setRating] = useState(0);
  const [hover,setHover] = useState(0);
  const [reviewText , setReviewText] = useState("");
  

  const handleSubmitReview = async e =>{
    e.preventDefault()

    try{
        if(!rating || !reviewText){
            return toast.error('Rating and review fields are required')          
        }

        const response = await Axios({
            ...SummaryApi.createReview,
            data: {
              userId : userId ,
              productId :productId,
              orderId : orderId,
              rating : rating,
              reviewText : reviewText
            },
          });
    
          const { data: responseData } = response;
    
          if (responseData.success) {
            toast.success(responseData.message)
            close()
          }
    }catch(error){
        AxiosToastError(error);
        close()
    }
  }

  

  return (
    <section className='bg-opacity-30 bg-black-50 fixed inset-0 z-50 '>
        <div className='bg-white shadow-lg p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            <button onClick={close} className='hover:text-red-500 text-right'>
                <IoClose  size={25}/>
            </button>
            <form className="mt-[30px]">
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 text-center">
                    How would you rate the product
                </h3>

                <div className="text-center">
                    {[...Array(5).keys()].map((_, index)=>{
                        index+=1;

                        return (
                            <button key={index} type="button"
                                className={`${index <= ((rating && hover ) || hover) 
                                    ? "text-secondaryColor" : "text-gray-400"} 
                                    bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={()=> setRating(index) }
                                onMouseEnter={()=> setHover(index)}
                                onMouseLeave={()=> setHover(rating)}
                                onDoubleClick={()=>{
                                    setHover(0);
                                    setRating(0);
                                }}
                            >
                                <span>
                                    <AiFillStar/> 
                                </span>
                            </button>
                        )
                    })}
                </div>
        

                <div className="mt-[20px]">
                    <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0 text-center">
                        Review product to help other consumers 
                    </h3>

                    <textarea className="border border-solid border-[#0066ff34] focus:outline outline-primayColor
                        w-full px-4 py-3 rounded-md"
                        rows="5"
                        placeholder="Write your Message"
                        onChange={e => setReviewText(e.target.value)}
                    ></textarea>
                </div>
            
                <div className="text-center">
                    <button type="submit" onClick={handleSubmitReview} className="btn">
                        Submit Feedback
                    </button>
                </div>

            </form>
        </div>
    </section>
  )
}

export default FeedbackForm