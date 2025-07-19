/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'


const SellerPermission = ({children}) => {
    const user = useSelector(state => state.user)


  return (
    <>
        {
            user.isSeller ?  children : <p className='text-red-600 bg-red-100 p-4'>Do not have permission</p>
        }
    </>
  )
}


export default SellerPermission