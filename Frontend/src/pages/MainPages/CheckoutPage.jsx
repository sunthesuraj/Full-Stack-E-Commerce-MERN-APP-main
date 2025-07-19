import { useState } from 'react'
import { useGlobalContext } from '../../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees'
import AddAddress from '../../components/UserDashboard/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import AddToCartButton from '../../components/MainPages/AddToCartButton'
import { pricewithDiscount } from '../../utils/PriceWithDiscount'


const CheckoutPage = () => {
  const {notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(null)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {

    if (!selectAddress) {
      toast.error('Please select a delivery address before placing the order.')
      return; // Prevent order placement if no address is selected
    }
      try {
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
          })

          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              if(fetchOrder){
                fetchOrder()
              }
              navigate('/success',{
                state : {
                  text : "Order"
                }
              })
          }

      } catch (error) {
        AxiosToastError(error)
      }
  }

  const handleOnlinePayment = async()=>{

    if (!selectAddress) {
      toast.error('Please select a delivery address before placing the order.')
      return; // Prevent order placement if no address is selected
    }

    try {
        toast.loading("Loading...")
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
        const stripePromise = await loadStripe(stripePublicKey)
       
        const response = await Axios({
            ...SummaryApi.payment_url,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
        })

        const { data : responseData } = response

        stripePromise.redirectToCheckout({ sessionId : responseData.id })
        
        if(fetchCartItem){
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }
    } catch (error) {
        AxiosToastError(error)
    }
  }


  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='bg-white w-full min-w-[60vw] flex flex-col gap-4'>
          <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
              <p>Your total savings</p>
              <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
          </div>

          {/* Quick Delivery Items */}
          {cartItemsList.some((item) => item.productId?.category[0]?.deliveryOptions === "quick") && (
            <div>
                  <h3 className='font-semibold p-4'>Quick Delivery Items :</h3>
                  <div className='bg-orange-50 rounded-lg p-4 grid gap-5 overflow-auto'>
                      {cartItemsList.map((item) => (
                          item.productId?.category[0]?.deliveryOptions === "quick" && (
                              <div key={item._id + "cartItemDisplay"} className='flex w-full gap-4'>
                                  <div className='flex gap-4 w-full'>
                                      <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                          <img
                                              src={item?.productId?.image[0]}
                                              className='object-scale-down'
                                              alt={item?.productId?.name}
                                          />
                                      </div>
                                      <div className='w-full max-w-sm text-xs'>
                                          <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                          <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                          <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                      </div>
                                      <div className='mt-1'>
                                          <AddToCartButton data={item?.productId} />
                                      </div>
                                  </div>
                              </div>
                          )
                      ))}
                  </div>
            </div>
          )}


          {/* Standard Delivery Items */}
          {cartItemsList.some((item) => item.productId?.category[0]?.deliveryOptions === "standard") && (
            <div>
                  <h3 className='font-semibold p-4'>Standard Delivery Items :</h3>
                  <div className='bg-green-50 rounded-lg p-4 grid gap-5 overflow-auto'>
                      {cartItemsList.map((item) => (
                          item.productId?.category[0]?.deliveryOptions === "standard" && (
                              <div key={item._id + "cartItemDisplay"} className='flex w-full gap-4'>
                                  <div className='flex gap-4 w-full'>
                                      <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                          <img
                                              src={item?.productId?.image[0]}
                                              className='object-scale-down'
                                              alt={item?.productId?.name}
                                          />
                                      </div>
                                      <div className='w-full max-w-sm text-xs'>
                                          <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                          <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                          <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                      </div>
                                      <div className='mt-1'>
                                          <AddToCartButton data={item?.productId} />
                                      </div>
                                  </div>
                              </div>
                          )
                      ))}
                  </div>
            </div>
          )}
        </div>

        <div className='flex flex-col w-full gap-4  items-center'>                
        <div className='w-full'>
          {/***address***/}
          <h3 className='font-bold p-3 text-headingColor text-[18px]'>Choose Your Delivery Address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                return (
                  <label htmlFor={"address" + index} key={index} className={!address.status && "hidden"}>
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      <div>
                        <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                      </div>
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer hover:bg-primary-200'>
              Add address
            </div>
          </div>



        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/**summary**/}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quntity total</p>
              <p className='flex items-center gap-2'>{totalQty} item</p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>Free</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p >Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold' onClick={handleOnlinePayment}>Online Payment</button>

            <button className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white' onClick={handleCashOnDelivery}>Cash on Delivery</button>
          </div>
        </div>
      </div>
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage
