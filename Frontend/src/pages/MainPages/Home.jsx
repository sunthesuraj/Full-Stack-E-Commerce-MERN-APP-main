import { useSelector } from 'react-redux'
import { valideURLConvert } from '../../utils/valideURLConvert'
import { useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../../components/QuickDeliveryproducts/CategoryWiseProductDisplay'
import HomeBanner from '../../components/MainPages/HomeBanner'
import CategoryWiseSubCategories from '../../components/StandardDeliveryProducts/CategoryWiseSubCategories'
import topPicks from '../../assets/Top picks.webp'
import { FcLowBattery } from "react-icons/fc";



const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat,deliveryOptions)=>{
      console.log(id,cat,deliveryOptions)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })

      let url 
      if(deliveryOptions === "quick"){
        url = `/${deliveryOptions}/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      }else if(deliveryOptions === "standard"){
        url = `/${deliveryOptions}/${valideURLConvert(cat)}-${id}`
      }
      
      navigate(url)
  }

  return (
   <section className='bg-white mt-0'>

    <div >
      {
        loadingCategory ? (
          <div className="w-full h-[100px] md:h-[150px] p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <FcLowBattery className="mr-2 animate-pulse text-yellow-500" size={80} />
          <span className="text-[14px] md:text-[22px] text-center text-gray-700 dark:text-gray-300 animate-pulse">
            The backend service for this application is hosted on Render's free tier. Service startup times may vary (2-4 minutes) , so
            please allow a few moments for full functionality to become available. Thank you for your patience.
          </span>
        </div>
        ) : (
          <HomeBanner />
        )
      }
    </div>

    <div className='mt-5 px-4'>
      <div className='text-sm lg:text-lg font-bold text-center mt-6'>Need it ASAP? Our Quick Delivery Has You Covered ..</div>
      <div className='text-md lg:text-[22px] font-bold text-center mt-4'>Shop what you want by Category ... We deliver them at your doorstep in minutes </div>
      
      <div className='container mx-auto mt-2 md:mt-8 px-0 md:px-4 my-2 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7  lg:gap-2'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ) :(
            categoryData.map((cat)=>{
              if(cat.deliveryOptions==='quick') {
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full object-scale-down' onClick={()=>handleRedirectProductListpage(cat._id,cat.name,cat.deliveryOptions)}>
                    <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down cursor-pointer'
                        />
                    </div>
                  </div>
                )
              }
              return null;
            })
              
            )
          }
      </div>
    </div>


    <div className='flex space-between items-center'>
          <img src={topPicks} alt='top-picks' className='w-12 h-12 object-scale-down'/>
          <div className='text-sm lg:text-lg text-primaryColor'>Top - picks from your location || We promise to get you best deals on every product quickly ..</div>
    </div>
        

    {/***display category product */}
      {
        categoryData?.map((c)=>{
          if(c.deliveryOptions==='quick' && c.isPopular ){
            return(
              <CategoryWiseProductDisplay 
                key={c?._id+"CategorywiseProduct"} 
                id={c?._id} 
                name={c?.name}
              />
            )
          }
          return null          
        })
      }



    <div className='mt-2 md:mt-4 lg:mt-6'>
      {
        categoryData.map((cat) => {
          if(cat.deliveryOptions === 'standard' && cat.isPopular){
            return(
              <div key={cat._id} className='w-full h-full px-2 lg:px-4 py-2' onClick={()=>handleRedirectProductListpage(cat._id,cat.name,cat.deliveryOptions)}>
                <div>
                  <img src={cat.bannerImage[0]} alt="" className='rounded-lg cursor-pointer'/>
                </div>
              </div>
            )
          }
        })
      }
    </div>

    
    <div className='container mx-auto mt-2 md:mt-4 lg:mt-8 px-4 my-2 '>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-4'>
      {categoryData?.map((c) => {
          if(c.deliveryOptions==='standard' && !c.isPopular){
            return(
              <CategoryWiseSubCategories
                key={c?._id+ "CategoryWiseSubcategory"}
                id={c?._id}
                name={c?.name}
              />
            )
          }
          return null
          })
        }
      </div>
    </div>



   </section>
  )
}

export default Home
