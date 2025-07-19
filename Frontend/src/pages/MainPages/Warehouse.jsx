import ComingSoon from '../../components/MainPages/ComingSoon'

export const Warehouse = () => {
  return (
    <section>
      <h1 className='heading text-center m-4'>Rent your Property... </h1>
      <p className='text_para text-center'>
        We are actively seeking properties to join our dense network of stores across India. 
        If you own a space that aligns with our requirements, your property could become the next store for us!
      </p>
      
      <div className="flex justify-center items-center">
        <ComingSoon/>
      </div>

      <p className='text_para text-center'>
        We will update for any requirement here ... 
      </p>
    </section>
  )
}

export default Warehouse
