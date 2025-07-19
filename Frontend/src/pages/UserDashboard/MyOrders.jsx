import { useState } from 'react' 
import { useSelector } from 'react-redux'
import noOrder from "../../assets/no-order.avif"
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees.js'
import FeedbackForm from '../../components/StandardDeliveryProducts/FeedbackForm.jsx'


const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  const [showFeedbackForm , setShowFeedbackForm] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orderStatusColorMap = {
    'Delivered': 'text-green-600',
    'Pending': 'text-yellow-500', 
    'Shipped': 'text-blue-500', 
    'Cancelled': 'text-red-500',
    'Processing': 'text-orange-500', 
  }

  return (
    <div>
      <div className='bg-white shadow-md lg:p-4 font-semibold'>
        <h2 className='heading px-4 '> My Orders </h2>
      </div>
        {
          !orders[0] && (
            <div className='flex flex-col items-center justify-center h-[400px]'>
              <img src={noOrder}></img>
              <div className='text-[22px] text-primaryColor text-semibold'>You haven&apos;t ordered anything yet .. </div>
            </div>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm '>
                  <p className='mb-2'>Order No : {order?.orderId}</p>
                  <div className='flex items-center gap-1 lg:gap-3 justify-between'>
                    <div className='flex items-center gap-3 w-1/2'>
                      <img
                        src={order.product_details.image[0]} 
                        className='w-14 h-14'
                      />  
                      <p className='font-semibold'>{order.product_details.name}</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-3 md:gap-8 items-center'>
                      <p>{DisplayPriceInRupees(order.product_details.price * order.quantity)}</p>
                      <p>Quantity : {order.quantity}</p>
                    </div>
                    

                    <div className='flex flex-col items-center gap-3'>
                        <p className={`${orderStatusColorMap[order.orderStatus]} font-semibold`}>{order.orderStatus}</p> 
                        {order.orderStatus==='Delivered' && order.product_details.deliveryOptions === 'standard' && <div className="text-center">
                            <button  
                              className="text-gray-700"  
                              onClick={()=>{
                                setShowFeedbackForm(true);
                                setSelectedOrder(order)
                              }}
                            >
                              Review Product
                            </button>
                        </div>}
                    </div>
                    
                  </div>

                  {showFeedbackForm && <FeedbackForm orderId = {selectedOrder?._id} productId = {selectedOrder?.productId} close={()=>setShowFeedbackForm(false)}/>}
              </div>
            )
          })
        }

      
    </div>
  )
}

export default MyOrders
