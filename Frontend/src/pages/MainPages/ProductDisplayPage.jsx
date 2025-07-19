/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../common/SummaryApi'
import Axios from '../../utils/Axios'
import AxiosToastError from '../../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees'
import Divider from '../../components/Divider'
import { pricewithDiscount } from '../../utils/PriceWithDiscount'
import AddToCartButton from '../../components/MainPages/AddToCartButton'
import AddToWishlistHeart from '../../components/MainPages/AddToWishlistHeart'
import ReviewPage from '../StandardDeliveryProducts/ReviewPage'
import useMobile from '../../hooks/useMobile'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()
  const [isMobile] = useMobile()

  const fetchProductDetails = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }


  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 bg-white'>
        <div>
            <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                <img
                    src={data.image[image]}
                    className='w-full h-full object-scale-down'
                /> 
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
                  )
                })
              }
            </div>
            <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                      {
                        data.image.map((img,index)=>{
                          return(
                            <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
                              <img
                                  src={img}
                                  alt='min-product'
                                  onClick={()=>setImage(index)}
                                  className='w-full h-full object-scale-down' 
                              />
                            </div>
                          )
                        })
                      }
                </div>
                <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                    <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
            {!isMobile && data.category && data.category[0].deliveryOptions==='standard' && (
              <ReviewPage reviews={data.reviews} totalRating={data.totalRating} averageRating={data.averageRating}/>
            )}
        </div>

        <div className='pt-4 lg:p-4 lg:pl-7 text-base lg:text-lg'>
            {data.category && data.category[0].deliveryOptions==='quick' && (
                <p className='bg-green-300 w-fit px-4 rounded-full mb-4'>10 Min</p>
            )}
            <div className='text-right text-[28px]'>
              {data.category && data.category[0].deliveryOptions === 'standard' && (
                <AddToWishlistHeart data={data}/>
              )}
            </div>
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>  
            <p className=''>{data.unit}</p> 
            <Divider/>
            <div>
              <p className=''>Price</p> 
              <div className='flex items-center gap-2 lg:gap-4'>
                <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
                </div>
                {
                  data.discount && (
                    <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                  )
                }
                {
                  data.discount && (
                    <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-green-500'>Discount</span></p>
                  )
                }
                
              </div>

            </div> 
              
              {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                  <div className='my-4'>
                    <AddToCartButton data={data}/>
                  </div>
                )
              }
          
            {/****only mobile */}
            <div className='my-4 grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
      
                {
                  data?.more_details && Object.keys(data?.more_details).map((element)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>

        {isMobile && data.category && data.category[0].deliveryOptions==='standard' && (
              <ReviewPage reviews={data.reviews} totalRating={data.totalRating} averageRating={data.averageRating}/>
        )}

        
    </section>
  )
}

export default ProductDisplayPage
