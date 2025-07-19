/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import ViewImage from "../ViewImage";

const ShowProductDetails = ({ close ,data : propsData}) => {
  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
        <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='heading'>Product Details</h2>
                <button onClick={close} className='hover:text-red-600'>
                    <IoClose size={20}/>
                </button>
            </div>
            <div className="flex flex-col gap-2 mt-6">
                <div className='flex gap-2 items-center'>
                {
                    propsData.image.map((img , index)=>{
                        return(
                            <div key={img + index} >
                                <img src={img} alt={img} className="w-28 h-28 object-scale-down" onClick={()=>{ViewImage(img)}}/>
                            </div>
                        )
                    })
                }
                </div>
                
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Name:</h2> 
                    <div className="text-md text-gray-900 ">{propsData.name}</div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Description:</h2> 
                    <div className="text-md text-gray-900 ">{propsData.description}</div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Unit:</h2> 
                    <div className="text-md text-gray-900 ">{propsData.unit}</div>
                </div>
                
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Category:</h2> 
                    <div>
                        {propsData.category.map((cat, index) => (
                            <span key={index}>{cat.name}</span> 
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Subcategory:</h2> 
                    <div>
                        {propsData.subCategory.map((subCat, index) => (
                            <span key={index}>{subCat.name}</span> 
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Stock:</h2> 
                    <div className="text-md text-gray-900 ">{propsData.stock}</div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Price:</h2> 
                    <div className="text-md text-gray-900 ">Rs. {propsData.price}</div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">Discount:</h2> 
                    <div className="text-md text-gray-900 ">{propsData.discount} %</div>
                </div>
                <div className="flex gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 ">More Details:</h2> 
                    <div>
                        {Object?.keys(propsData?.more_details).map((k,index) => (
                            <div key={index}>
                                {k} : {propsData.more_details[k]}
                            </div> 
                        
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ShowProductDetails