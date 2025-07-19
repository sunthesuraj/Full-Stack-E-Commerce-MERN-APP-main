import noAddress from '../assets/NoAddress.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img
        src={noAddress}
        alt='no data'
        className='w-36' 
      />
      <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData