import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { valideURLConvert } from "../../utils/valideURLConvert"

const AllCategories = () => {

    
    const categoryData = useSelector(state => state.product.allCategory)
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const navigate = useNavigate()

    const handleRedirectProductListpage = (id,cat,deliveryOptions)=>{
          
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

    const handleRedirectSubCategory = (subCategoryId, subCategoryName, categoryId, categoryName , deliveryOptions) => {
        const url = `/${deliveryOptions}/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subCategoryName)}-${subCategoryId}`;
        navigate(url);
    }


  return (
    <section className="mx-2">
        <div className="heading text-center">Explore Our Product Range : Choose Your Delivery</div>
        <div className="grid grid-cols-2 mt-6 ">
            <div>
                <h1 className="font-bold text-md lg:text-lg ">Quick Delivery : </h1>
                <div className="flex flex-col gap-2 mt-4">
                    {
                        categoryData.map((cat)=>{
                            if(cat.deliveryOptions==='quick') {
                                return(
                                    <div key={cat._id+"displayCategory"} >
                                    <h3 className="font-semibold cursor-pointer "
                                        onClick={()=>handleRedirectProductListpage(cat._id,cat.name,cat.deliveryOptions)}>{cat.name}</h3>
                                    {subCategoryData.filter(sub => sub.category.some(c => c._id === cat._id)).map(subCat => (
                                        <div key={subCat._id}  onClick={() => handleRedirectSubCategory(subCat._id, subCat.name, cat._id, cat.name , cat.deliveryOptions)}>
                                            <p className="text-gray-500 pl-6 cursor-pointer">{subCat.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }})
                    }
                </div>
            </div>
            
            <div>
                <h1 className="font-bold text-md lg:text-lg">Standard Delivery : </h1>
                <div className="flex flex-col gap-2 mt-8">
                    {
                        categoryData.map((cat)=>{
                            if(cat.deliveryOptions==='standard') {
                                return(
                                    <div key={cat._id+"displayCategory"}  >
                                    <h3 className="font-semibold cursor-pointer " 
                                        onClick={()=>handleRedirectProductListpage(cat._id,cat.name,cat.deliveryOptions)}
                                    >
                                        {cat.name}
                                    </h3>
                                    {subCategoryData.filter(sub => sub.category.some(c => c._id === cat._id)).map(subCat => (                       
                                        <div key={subCat._id} onClick={() => handleRedirectSubCategory(subCat._id, subCat.name, cat._id, cat.name , cat.deliveryOptions)}>
                                            <p className="text-gray-500 pl-6 cursor-pointer">{subCat.name}</p>    
                                        </div>
                                    ))}
                                </div>
                            )
                        }})
                    }
                </div>
            </div>
            

        </div>
    </section>
    
  )
}

export default AllCategories