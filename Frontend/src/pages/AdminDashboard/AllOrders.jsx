import { useState , useEffect } from 'react'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import noOrder from "../../assets/no-order.avif"
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees'

const AllOrders = () => {
  const [orders,setOrders] = useState([])
  const [status, setStatus] = useState('all')
  const [page,setPage] = useState(1)

  const fetchOrders = async()=>{
    try {
        const response = await Axios({
           ...SummaryApi.getAllOrders,
           data : {
            page ,
            limit : 12,
            status: status === 'all' ? '' : status, // Filter by status if not 'all'
         }
        })

        const { data : responseData } = response 

        if(responseData.success){
          
          setOrders(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  
  useEffect(()=>{
    fetchOrders()
  },[page,status])

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1); // Reset page to 1 when status changes
  };


  const orderStatusColorMap = {
    'Delivered': 'text-green-600',
    'Pending': 'text-yellow-500', 
    'Shipped': 'text-blue-500', 
    'Cancelled': 'text-red-500',
    'Processing': 'text-orange-500', 
  }

  return (
    <div>
      <div className='bg-white shadow-md p-2  md:p-4 font-semibold'>
        <div className='flex justify-between'>
        <h2 className='heading px-2 md:px-4 '> All Orders </h2>
        <div className='h-full min-w-24 max-w-44 w-full ml-auto bg-gray-100 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-secondaryColor'>
          <select value={status} onChange={handleStatusChange} className='text-gray-700 focus:outline-none'>
            <option value='all'>All Orders</option>
            <option value='Delivered'>Delivered</option>
            <option value='Pending'>Pending</option>
            <option value='Shipped'>Shipped</option>
            <option value='Cancelled'>Cancelled</option>
            <option value='Processing'>Processing</option>
          </select>
        </div>
        </div>
      </div>
        {
          !orders[0] && (
            <div className='flex flex-col items-center justify-center h-[400px]'>
              <img src={noOrder}></img>
              <div className='text-[22px] text-primaryColor text-semibold'>No  Orders  yet  On  QuickBuy.. </div>
            </div>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm '>
                  <p className='mb-2'>Order No : {order?.orderId}</p>
                  <div className='flex items-center gap-3 justify-between'>
                    <div className='flex items-center gap-3 w-1/2'>
                      <img
                        src={order.product_details.image[0]} 
                        className='w-14 h-14'
                      /> 
                      <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>{order.product_details.name}</p>
                        <p>Seller : {order.product_details.seller.name}</p>
                      </div> 
                    </div>

                    <div className='flex flex-col md:flex-row gap-3 md:gap-8 items-center'>
                      <p>{DisplayPriceInRupees(order.product_details.price * order.quantity)}</p>
                      <p>Quantity : {order.quantity}</p>
                    </div>
                    

                    <p className={`${orderStatusColorMap[order.orderStatus]} font-semibold`}>{order.orderStatus}</p> 
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default AllOrders
