import { useEffect } from 'react'
import './Carousel.css'
import { useState } from 'react'

const Carousel = () => {

   // const [ leftPic, setLeftPic ] = useState('left-pic')
   // const [ middlePic, setMiddlePic ] = useState('middle-pic')
   // const [ rightPic, setRightPic ] = useState('right-pic')

   // let index = 0

   // const carouselRotation = () => {
   //    setInterval(() => {
   //       index = (index + 1) % 4;
   //       switch (index) {
   //          case 1:
   //             setLeftPic('left-pic');
   //             setMiddlePic('middle-pic');
   //             setRightPic('right-pic');
   //             break;
   //          case 2:
   //             setLeftPic('right-pic');
   //             setMiddlePic('left-pic');
   //             setRightPic('middle-pic');
   //             break;
   //          case 3:
   //             setLeftPic('middle-pic');
   //             setMiddlePic('right-pic');
   //             setRightPic('left-pic');
   //             break;
   //       }
   //    }, 3000)
   // }



   return (
      <div className='flex h-52 w-full mt-28 relative border border-blue-600'>
         <img src="/assets/photos/img-02.png" alt="" className='left-pic'/>
         <img src="/assets/photos/img-01.png" alt="" className='middle-pic'/>
         {/* <img src="/assets/photos/img-03.png" alt="" className='right-pic'/> */}
      </div>
   )
}

export default Carousel