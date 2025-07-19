/* eslint-disable react/prop-types */
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../../utils/UploadImage';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError';
import Loading from '../Loading';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const EditCategory = ({close, fetchData, data : CategoryData}) => {
    const [data,setData] = useState({
        _id : CategoryData._id,
        name : CategoryData.name,
        description : CategoryData.description,
        image : CategoryData.image,
        bannerImage : CategoryData.bannerImage,
        deliveryOptions : CategoryData.deliveryOptions,
        isPopular : CategoryData.isPopular
    })

    const [loading,setLoading] = useState(false)
    const [imageLoading,setImageLoading] = useState(false)

    const handleOnChange = (e)=>{
        const { name, value , type } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : type === 'checkbox' ? e.target.checked : value
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }
    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
        const { data : ImageResponse } = response
        setLoading(false)
        
        setData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }

    const handleUploadBannerImage = async(e)=>{
        const file = e.target.files[0]
    
        if(!file){
          return 
        }
        setImageLoading(true)
        const response = await uploadImage(file)
        const { data : ImageResponse } = response
        const imageUrl = ImageResponse.data.url 
    
        setData((preve)=>{
          return{
            ...preve,
            bannerImage : [...preve.bannerImage,imageUrl]
          }
        })
        setImageLoading(false)
      }

      const handleDeleteImage = async(index)=>{
        data.bannerImage.splice(index,1)
        setData((preve)=>{
          return{
              ...preve
          }
        })
    }


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 z-50 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white w-full max-w-xl overflow-y-auto h-full max-h-[80vh] p-4 rounded '>
            <div className='flex items-center justify-between'>
                <h1 className='heading '>Edit  Category</h1>
                <button onClick={close} className='w-fit block ml-auto hover:text-red-500'>
                    <IoClose size={25}/>
                </button>
            </div>


            <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label id='categoryName' className='form_label'>Name</label>
                    <input
                        type='text'
                        id='categoryName'
                        placeholder='Enter category name'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        className='form_input'
                    />
                </div>
                <div className='grid gap-1'>
                    <label id='categoryDescription' className='form_label'>Description for the Category</label>
                    <textarea
                        rows="3"
                        id='categoryDescription'
                        placeholder='Enter category description'
                        value={data.description}
                        name='description'
                        onChange={handleOnChange}
                        className='form_input resize-vertical' 
                    />
                </div>
                <div className='grid gap-1'>
                    <p className='form_label'>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                            {
                                data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )
                            }
                            
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                            <div  className={`
                            ${!data.name ? "bg-gray-300" : "border-secondaryColor hover:bg-secondaryColor" }  
                                px-4 py-2 rounded cursor-pointer border font-medium
                            `}>Upload Image</div>

                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                        
                    </div>
                </div>

                <div>
                    <p className='form_label'>Upload some banner Images for this category</p>
                     <div>
                      <label htmlFor='bannerImage' className='bg-blue-50 h-16 border rounded flex justify-center items-center cursor-pointer'>
                          <div className='text-center flex justify-center items-center flex-col'>
                            {
                              imageLoading ?  <Loading/> : (
                                <>
                                   <FaCloudUploadAlt size={25}/>
                                   <p>Upload Image</p>
                                </>
                              )
                            }
                          </div>
                          <input 
                            type='file'
                            id='bannerImage'
                            className='hidden'
                            accept='image/*'
                            onChange={handleUploadBannerImage}
                          />
                      </label>
                      {/**display uploded image*/}
                      <div className='flex flex-wrap gap-4'>
                        {
                          data.bannerImage.map((img,index) =>{
                              return(
                                <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                                  <img
                                    src={img}
                                    alt={img}
                                    className='w-full h-full object-scale-down cursor-pointer' 
                                    onClick={()=>setViewImageURL(img)}
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                    <MdDelete/>
                                  </div>
                                </div>
                              )
                          })
                        }
                      </div>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div>
                        <p className='form_label'>Select Delivery Option : </p>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    name="deliveryOptions" 
                                    value="standard" 
                                    checked={data.deliveryOptions === "standard"} 
                                    onChange={handleOnChange} 
                                />
                                Standard Delivery
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    name="deliveryOptions" 
                                    value="quick" 
                                    checked={data.deliveryOptions === "quick"} 
                                    onChange={handleOnChange} 
                                />
                                    Quick Delivery
                            </label>
                        </div>
                    </div>

                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                name="isPopular" 
                                checked={data.isPopular} 
                                onChange={handleOnChange} 
                            />
                                <span className='form_label ml-1'>Mark as Popular</span>
                            </label>
                    </div>
                </div>
                
                <button
                    className={`
                    ${data.name && data.image && data.description && data.deliveryOptions ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                    py-4
                    rounded-lg    
                    font-semibold 
                    `}
                >Update Category</button>

            </form>
        </div>
    </section>
  )
}

export default EditCategory
