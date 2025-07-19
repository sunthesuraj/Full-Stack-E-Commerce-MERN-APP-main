import { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../../utils/AxiosToastError'
import Loading from '../../components/Loading'
import CardProductStandard from '../../components/StandardDeliveryProducts/CardProductStandard'
import { valideURLConvert } from '../../utils/valideURLConvert'
import ProductListFilters from '../../components/StandardDeliveryProducts/ProductListFilters';
import useMobile from '../../hooks/useMobile'




const ProductListPageStandard = () => {
  const [data, setData] = useState([])
  const [categoryData , setCategoryData] = useState({})
  const [subcategoryData , setSubcategoryData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const [ isMobile ] = useMobile()
  
  const [filters, setFilters] = useState({
    //priceRange: { min: '', max: '' },
    sortBy : "default",
    rating: [],
    discount: [],
  });


  const category = params?.category?.split("-")
  const categoryName = category?.slice(0, category?.length - 1)?.join(" ")
  const categoryId = params.category.split("-").slice(-1)[0]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: categoryId,
          page: page,
          limit: 15,
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

  const fetchCategoryData = async() =>{
    try{
      const response = await Axios({
        ...SummaryApi.getCategoryById,
        data : {
          _id : categoryId
        }
      })

      const { data : responseData } = response
      
      if(responseData.success){
        setCategoryData(responseData.data)
      }
    }catch (error) {
      AxiosToastError(error)
    } 
  }

  const fetchSubcategoryData = async() => {
    try{
      const response = await Axios({
        ...SummaryApi.getSubcategoryByCategory,
        data : {
          id : categoryId
        }
      })

      const { data : responseData } = response
      
      if(responseData.success){
        setSubcategoryData(responseData.data)
      }
    }catch (error) {
      AxiosToastError(error)
    } 
  }

  useEffect(() => {
    fetchCategoryData()
    fetchProductdata()
    fetchSubcategoryData()
  },[categoryId , filters])

  
  return (
    <section className='bg-white'>
      {/**diaplay subCategories under this category */}
      <div className='flex item-center justify-center lg:gap-8 md:gap-4 gap-2 '>
        {
          subcategoryData.map((s) => {
            const link = `/standard/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link key={s._id} to={link}>
                <div className='flex flex-col items-center gap-6 lg:gap-2'>
                  <img src={s.image} 
                       alt={s.name} 
                       className='w-16 h-16 rounded-full object-scale-down'/>
                  <p className='hidden lg:block'>{s.name}</p>
                </div>
              </Link> 
            )
          })
        }
      </div>

      {categoryData.bannerImage?.length > 1 && ( // Check if bannerImage exists and has elements
        <div className="banner-container mt-6">
            <Slider {...settings}>
                {categoryData.bannerImage.map((banner, index) => (
                  <div key={index}>
                    <img
                      src={banner}
                      alt={`Banner ${index + 1}`}
                      className="banner-image w-full h-full lg:h-64 object-scale-down rounded-lg"
                    />
                  </div>
                ))}
            </Slider>
        </div>
      )}

      <h1 className='text-center heading mt-6'>{categoryData.name}</h1>
      <h2 className='text-center text-[16px] lg:text-[22px] leading-[18px] lg:leading-[30px] font-semibold text-textColor mt-[18px]'>{categoryData.description}</h2>

      <div className='container mx-auto p-3 grid md:grid-cols-[250px,1fr]'>
        {/* Filters */}

        {!isMobile && 
        <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto'>
          <ProductListFilters onFilterChange={setFilters} /> 
        </div>}
        
      
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-2 '>
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
      
     
     {
        loading && (
            <Loading />
        )
     }
     
    </section>
  )
}

export default ProductListPageStandard
