import { useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import CardProductStandard from "../../components/StandardDeliveryProducts/CardProductStandard"
import ProductListFilters from "../../components/StandardDeliveryProducts/ProductListFilters"
import useMobile from '../../hooks/useMobile'

const SubcategoryWiseProductListStandard = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [ isMobile ] = useMobile()
    const params = useParams()

    const [filters, setFilters] = useState({
      //priceRange: { min: '', max: '' },
      sortBy : "default",
      rating: [],
      discount: [],
    });
    
    //const category = params?.category?.split("-")
    //const categoryName = category?.slice(0, category?.length - 1)?.join(" ")
    const categoryId = params?.category?.split("-").slice(-1)[0]
    const subCategory = params?.subcategory?.split("-")
    const subCategoryName = subCategory?.slice(0,subCategory.length-1)?.join(" ")
    const subCategoryId = params?.subcategory?.split("-").slice(-1)[0]

    const fetchProductdata = async () => {
        try {
          setLoading(true)
          const response = await Axios({
            ...SummaryApi.getProductByCategoryAndSubCategory,
            data: {
              categoryId: categoryId,
              subCategoryId: subCategoryId,
              page: page,
              limit: 8,
              filters,
            }
          })
    
          const { data: responseData } = response
    
          if (responseData.success) {
            if (responseData.page == 1) {
              setData(responseData.data)
            } else {
              setData([...data, ...responseData.data])
            }
            setTotalPage(responseData.totalCount)
          }
        } catch (error) {
          AxiosToastError(error)
        } finally {
          setLoading(false)
        }
      }

      useEffect(()=>{
        fetchProductdata()
      },[params , filters])
    


    
  return (


    <div className='lg:px-4 overflow-y-auto relative'>

        <h2 className="heading text-center">Buy {subCategoryName} online at QuickBuy</h2>

        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
        {/* Filters */}
        {!isMobile &&
        <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto'>
          <ProductListFilters onFilterChange={setFilters} /> 
        </div>
        }
        <div className=' grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4 gap-2 '>
            {
                data.map((p, index) => {
                  return (
                    <CardProductStandard
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  )
                })
            }
        </div>
        </div>
     </div>
  )
}

export default SubcategoryWiseProductListStandard