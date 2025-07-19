import { useSelector } from "react-redux"
import { DisplayPriceInRupees } from "../../utils/DisplayPriceInRupees"
import { pricewithDiscount } from "../../utils/PriceWithDiscount"
import AddToCartButton from "../../components/MainPages/AddToCartButton"
import { Link } from "react-router-dom"
import imageEmpty from '../../assets/empty_cart.webp'
import AddToWishlistHeart from "../../components/MainPages/AddToWishlistHeart"


const WishlistPage = () => {

  const wishlistItems  = useSelector(state => state.wishlistItem.wishlist)

  return (
    <section className='bg-white 2xl:h-[800px]'>

        {/***display items */}
        {
            wishlistItems[0] ? (
            <>              
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full rounded-lg p-4 overflow-auto'>
                    {
                        wishlistItems[0] && (
                            wishlistItems.map((item)=>{
                                return(
                                    
                                    <div key={item?._id+"wishlistItemDisplay"} className='flex items-center w-full h-full gap-4 p-4 border border-gray-400'>
                                        <div className='w-16 h-16 min-h-16 min-w-16 lg:w-24 lg:h-24 border rounded'>
                                            <img
                                                src={item?.productId?.image[0]}
                                                className='object-scale-down'
                                            />
                                        </div>
                                        <div className='grow flex flex-col justify-between w-full max-w-sm text-xs lg:text-lg'>
                                            <p className='text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                            <p className='text-neutral-400 line-clamp-3'>{item?.productId?.unit}</p>
                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-8">
                                            <AddToWishlistHeart data={item?.productId}/>
                                            <AddToCartButton data={item?.productId}/>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </>
            ) : (
                <div className='bg-white flex flex-col justify-center items-center'>
                    <img
                        src={imageEmpty}
                        className='w-60 h-60 object-scale-down' 
                    />
                        <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                    </div>
                )
        }            
    </section>
  )
}

export default WishlistPage