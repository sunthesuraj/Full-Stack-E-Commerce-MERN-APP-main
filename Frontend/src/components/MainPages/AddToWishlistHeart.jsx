/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useGlobalContext } from '../../provider/GlobalProvider';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../../utils/AxiosToastError';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";

const AddToWishlistHeart = ({ data }) => {
  const { fetchWishlist } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const wishlistItems = useSelector(state => state.wishlistItem.wishlist);


  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.updateWishlist, 
        data: { 
          productId: data?._id 
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchWishlist) {
          fetchWishlist()
      }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const isItemInWishlist = wishlistItems.some(item => item.productId._id === data._id);

  return (
    <div>
      {isItemInWishlist ? (
        <button 
          onClick={handleAddToWishlist} 
        >
           <IoIosHeart color='red'/>
        </button>
      ) : (
        <button 
          onClick={handleAddToWishlist} 
        >
          {loading ? <Loading /> : <CiHeart color='red'/>}
        </button>
      )}
    </div>
  );
};

export default AddToWishlistHeart;
