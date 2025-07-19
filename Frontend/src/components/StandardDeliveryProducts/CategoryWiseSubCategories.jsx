/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
//import { useSelector } from 'react-redux'
import { valideURLConvert } from '../../utils/valideURLConvert'



const CategoryWiseSubCategories = ({ id , name }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const fetchCategoryWiseSubCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getSubcategoryByCategory,
                data: {
                    id : id,
                    limit : 4
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }else {
                // Handle potential API errors (e.g., category not found)
                console.error('Error fetching subCategory :', responseData.message);
                setData([]); // Set data to empty array to prevent rendering products
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseSubCategory()
    }, [])

    /*const handleProductListPageStandard = (subCategoryId , subCategoryName) =>{
      let url = `/standard/${valideURLConvert(name)}-${valideURLConvert(id)}/${valideURLConvert(subCategoryName)}-${valideURLConvert(subCategoryId)}`
      navigate(url)
    }*/

    const handleRedirectCategoryListpageStandard = ()=>{
        let url  = `/standard/${valideURLConvert(name)}-${id}`
        navigate(url)
    }

    const handleRedirectSubcategoryListpageStandard = (subcategoryId , subcategoryName)=>{
      let url  = `/standard/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategoryName)}-${subcategoryId}`
      return url
    }

    
    return (
        <div className="border border-gray-400 rounded-lg p-2 h-auto w-full bg-gradient-to-tl from-[#ECDCFF] to-white"> 
          <div className='flex justify-between items-center mb-2'>
            <p className='text-md line-clamp-2 lg:text-lg font-bold text-colorHeading'>{name}</p>
            <p onClick={handleRedirectCategoryListpageStandard} className='cursor-pointer hover:text-primaryColor text-sm lg:text-md hidden md:block'>Explore More</p>
          </div>
          
          {/* Display category name here */}
          <div className="grid grid-cols-2 gap-2"> 
            {loading ? (
              <div className="col-span-2 flex justify-center items-center h-24"> 
                <span>Loading...</span> 
              </div>
            ) : data.length > 0 ? (
              data.map((subCategory) => (
                <Link key={subCategory._id} to={handleRedirectSubcategoryListpageStandard(subCategory._id,subCategory.name)}>
                <div  className="flex flex-col items-center lg:mt-2">
                  <img 
                    src={subCategory.image } 
                    alt={subCategory.name}
                    className="w-full h-full lg:h-[150px] object-scale-down rounded-lg lg:mb-2" 
                  />
                  <p className="text-sm font-medium hidden lg:block">{subCategory.name}</p>
                  
                </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-400">No subcategories yet</div> 
            )}
          </div>

          <p onClick={handleRedirectCategoryListpageStandard} className='md:hidden text-[12px] text-right p-2'>Explore More...</p>
        </div>
      );
}

export default CategoryWiseSubCategories