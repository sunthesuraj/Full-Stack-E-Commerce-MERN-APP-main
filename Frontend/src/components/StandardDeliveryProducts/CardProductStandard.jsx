/* eslint-disable react/prop-types */
//import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees'
import { valideURLConvert } from '../../utils/valideURLConvert'
import { pricewithDiscount } from '../../utils/PriceWithDiscount'
//import SummaryApi from '../common/SummaryApi'
//import AxiosToastError from '../utils/AxiosToastError'
//import Axios from '../utils/Axios'
//import toast from 'react-hot-toast'
//import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from '../MainPages/AddToCartButton'
import AddToWishlistHeart from '../MainPages/AddToWishlistHeart'
import Divider from '../../components/Divider'

const CardProduct = ({data}) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    //const [loading,setLoading] = useState(false)
  
  return (

    data.status === "approved" && (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-38 lg:min-w-52 rounded cursor-pointer bg-white' >
      <div className='text-[20px]'>
          <AddToWishlistHeart data={data}/>
      </div>
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={data.image[0]}
                className='w-full h-full object-scale-down lg:scale-125'
            />
      </div>
      <div>
          {
            Boolean(data.discount) && (
              <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>              
            )
          }
      </div>

      <div className='px-2 lg:px-0 font-semibold text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit} 
        
      </div>
      <Divider />
      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex flex-col lg:flex-row items-center gap-1'>
          <div className='font-semibold text-[16px] lg:text-[18px]'>
              {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
          </div>
          <div>
              {data.discount && (
                    <p className='line-through text-[12px]'>{DisplayPriceInRupees(data.price)}</p>
              )}
          </div>
          
          
        </div>
        <div className=''>
          {
            data.stock == 0 ? (
              <p className='text-red-500 text-sm text-center'>Out of stock</p>
            ) : (
              <AddToCartButton data={data} />
            )
          }
            
        </div>
      </div>

    </Link>
    )
  )
}

export default CardProduct
