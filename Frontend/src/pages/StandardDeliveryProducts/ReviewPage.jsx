/* eslint-disable react/prop-types */
import {AiFillStar} from 'react-icons/ai';
import { formatDate } from "../../utils/formatDate"
import starIcon from "../../assets/Star.png";

const ReviewPage= ({reviews, totalRating , averageRating}) => {

  return (
    <div>
    {reviews.length>0  && (
        <div className='px-4 mt-[30px]'>
            <div className="flex justify-between gap-[6px] mb-[30px]">
                <h4 className="text-[20px] leading-[30px] text-headingColor font-bold">
                    All Reviews & Ratings
                </h4>  
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                        lg:leading-7 font-semibold text-headingColor"
                  >
                    <img src={starIcon} alt="" /> {averageRating}/5
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px]
                        lg:leading-7 font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>     
            </div>

            {reviews?.map((review , index)=>
                (
                    <div key={index} className='border shadow-lg p-3 mb-[30px]'>
                        <div className='flex flex-col gap-2'>
                            <div className="flex gap-1">
                                {[...Array(review?.rating).keys()].map((_,index)=>(
                                    <AiFillStar key={index} className='text-secondaryColor'/>
                                ))}
                            </div>
                            <h5 className='text-gray-700 font-semibold text-[16px]'>
                                {review.reviewText} 
                            </h5>
                            <p className="text-[15px] leading-6 text-gray-500 font-medium">
                                {review?.user?.name} [{formatDate(review?.createdAt)}]
                            </p>
                        
                        </div>
                    </div>
                )
            )}
        </div>
    )}
    </div>
  );
};

export default ReviewPage