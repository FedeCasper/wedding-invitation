import './Spinner.css'

const Spinner = () => {
   return (
      <div className="spinner-text h-[200px] w-[200px] absolute top-[50px] -left-[100px] z-50 flex justify-center items-center">
         <img src="/assets/images/rounded-text-mobile.png" alt="" />
      </div>
   )
}

export default Spinner