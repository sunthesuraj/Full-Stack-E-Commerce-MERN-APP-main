import { useEffect, useState } from 'react'
import UploadCategoryModel from '../../components/AdminDashboard/UploadCategoryModel'
import Loading from '../../components/Loading'
import NoData from '../../components/NoData'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import EditCategory from '../../components/AdminDashboard/EditCategory'
import CofirmBox from '../../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError'
import { FaPlusCircle } from "react-icons/fa";
import useMobile from '../../hooks/useMobile'


const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        description :"",
        image : "",
        bannerImage : ""
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
    const [isMobile] = useMobile()
    // const allCategory = useSelector(state => state.product.allCategory)


    // useEffect(()=>{
    //     setCategoryData(allCategory)
    // },[allCategory])
    
    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData } = response

            if(responseData.success){
                setCategoryData(responseData.data)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section className='p-0'>
        <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center mb-5'>
            <h2 className='heading px-4  line-clamp-1'>Category</h2>
            {
              isMobile ? (
                <FaPlusCircle 
                  size={30} 
                  className='cursor-pointer text-secondaryColor'
                  onClick={()=>setOpenUploadCategory(true)}
                />
              ) : (
                <button onClick={()=>setOpenUploadCategory(true)} className='btn'>Add Category</button>
              )
            }
        </div>
        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='md:p-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {
                categoryData.map((category)=>{
                    return(
                        <div className='w-30 h-60 rounded shadow-md' key={category._id}>
                            <img 
                                alt={category.name}
                                src={category.image}
                                className='w-full object-scale-down'
                            />
                            <div className='h-9 flex items-center gap-2 p-2 mt-4 md:mt-0 md:p-0'>
                                <button onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(category)
                                }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                                    Edit
                                </button>
                                <button onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {
            loading && (
                <Loading/>
            )
        }

        {
            openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
            )
        }

        {
           openConfimBoxDelete && (
            <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
           ) 
        }
    </section>
  )
}

export default CategoryPage
