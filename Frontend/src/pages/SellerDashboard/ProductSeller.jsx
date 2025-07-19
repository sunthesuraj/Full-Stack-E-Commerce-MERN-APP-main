/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import Loading from '../../components/Loading'
import ProductCardSeller from '../../components/SellerDashboard/ProductCardSeller.jsx'
//import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'

const ProductSeller = () => {

  const { _id , name } = useSelector((state) => state.user )
  
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  //const [search,setSearch] = useState("")
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProductBySeller,
           data : {
              sellerId: _id,
              page : page,
              limit : 12 ,
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setTotalPageCount(responseData.totalNoPage)
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[page])

  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

  /*const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(()=>{
    let flag = true 

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300);

    return ()=>{
      clearTimeout(interval)
    }
  },[search])*/
  
  return (
    <section className='p-0'>

        <div className='px-2 lg:p-2  bg-white shadow-md '>
            <h2 className='heading px-4'>Product For Seller : {name} </h2>
        </div>        

        {
          loading && (
            <Loading/>
          )
        }


        <div className='p-4 bg-blue-50'>


            <div className='min-h-[55vh]'>
              <div className='grid lg:grid-cols-2 gap-4'>
                {
                  productData.map((p,index)=>{
                    return(
                      <ProductCardSeller key={index} data={p} fetchProductData={fetchProductData}  />
                    )
                  })
                }
              </div>
            </div>
            
            <div className='flex justify-between my-4'>
              <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
              <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
              <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
            </div>

        </div>
          

      
    </section>
  )
}

export default ProductSeller
