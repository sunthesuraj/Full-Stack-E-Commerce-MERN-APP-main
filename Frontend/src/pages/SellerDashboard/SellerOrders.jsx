import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import Axios from '../../utils/Axios';
import noOrder from "../../assets/no-order.avif";
import { DisplayPriceInRupees } from '../../utils/DisplayPriceInRupees';

const SellerOrders = () => {

  const { _id } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('all'); 
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderStatusModal, setOrderStatusModal] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('Processing');

  const fetchOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSellerOrders,
        data: {
          sellerId: _id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setOrders(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const orderStatusColorMap = {
    Delivered: 'text-green-600',
    Pending: 'text-yellow-500', 
    Shipped: 'text-blue-500', 
    Cancelled: 'text-red-500',
    Processing: 'text-orange-500', 
  };

  const handleOrderStatusUpdate = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.updateOrderStatus,
        data: {
          orderId : selectedOrder._id,
          orderStatus: selectedOrderStatus,
        },
      });

      if (response.data.success) {
        fetchOrders();
        setOrderStatusModal(false);
        setSelectedOrderStatus('Processing'); // Reset selected status
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className='bg-white shadow-md p-2 lg:p-4 font-semibold'>
      <div className='flex justify-between'>
        <h2 className='heading px-2 lg:px-4'> Seller Orders</h2>
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
      {!orders[0] && (
        <div className='flex flex-col items-center justify-center h-[400px]'>
          <img src={noOrder} alt="No Orders" />
          <div className='text-[22px] text-primaryColor text-semibold'>No Orders Yet.</div>
        </div>
      )}
      {orders.map((order, index) => (
        <div key={order._id + index + 'order'} className='order rounded p-4 text-sm border-gray-200 border my-2'>
          <p className='mb-2'>Order No : {order?.orderId}</p>
          <div className='flex flex-col md:flex-row md:items-center gap-3 justify-between'>
            <div className='flex items-center gap-3 w-full md:w-1/3'>
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className='w-14 h-14'
              />
              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>{order.product_details.name}</p>
                <p>{DisplayPriceInRupees(order.product_details.price * order.quantity)}</p>
                <p>Quantity : {order.quantity}</p>
              </div>
            </div>
            <div className='flex items-center gap-4 md:gap-8 w-full md:w-1/2'>
            <div >
              <p className='font-semibold'>Shipping Address : </p>
              <p>{order.delivery_address.address_line}</p>
              <p>{order.delivery_address.city}</p>
              <p>{order.delivery_address.pincode} , {order.delivery_address.state}</p>
            </div>

            <p className={`${orderStatusColorMap[order.orderStatus]} font-semibold`}>{order.orderStatus}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => { 
                setSelectedOrder(order); 
                setOrderStatusModal(true); 
              }}
            >
              Update Status
            </button>
            </div>
          </div>
        </div>
      ))}

      {orderStatusModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Update Order Status</h2>
            <div className="mb-4">
              <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700">
                Order Status:
              </label>
              <select 
                id="orderStatus" 
                value={selectedOrderStatus} 
                onChange={(e) => setSelectedOrderStatus(e.target.value)} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleOrderStatusUpdate} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button 
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2"
                onClick={() => setOrderStatusModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;