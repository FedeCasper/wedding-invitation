import axios from 'axios';
import { useEffect, useState } from 'react';
import ChurchIcon from '@mui/icons-material/Church';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2'


const Layout = () => {

   const [foundGuests, setFoundGuests] = useState({});
   const [fullData, setFullData] = useState([]);
   const [executed, setExecuted] = useState(false);
   const [stadisticData, setStadisticData] = useState({
      assistToChucrh: 0,
      notAssistToChucrh: 0,
      assistsToWedding: 0,
      notAssistsToWedding: 0,
      partner: [],
      totalAssists: 0,
      totalNoAssists: 0,
      totalNoPartners: 0,
      totalAssistSingleNumber: 0,
      totalPartnersNumber: 0,
      foodRestrictions: 0,
      totalChildrens: 0,
   });

   const [visibleItems, setVisibleItems] = useState(10);
   const itemsPerPage = 10;

   const handleShowMore = () => {
      setVisibleItems(prev => prev + itemsPerPage);
   };

   const handleShowLess = () => {
      setVisibleItems(prev => prev - itemsPerPage);
   }

   const guestIndividualData = (id) => {
      let guest = fullData?.find(guest => guest._id === id)
      setFoundGuests(guest);
      console.log(foundGuests);
   }

   console.log(executed);

   const handleData = () => {
      axios
         .get('https://wedding-invitation-backend.vercel.app/api/guests')
         .then((response) => {
            console.log('Response:----------->', response.data);
            console.log('Response type:----------->', typeof response.data );
            setFullData(response.data);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   };


   const handleStadistic = () => {

      if (!executed) {
         fullData?.forEach( guest => {

            // if (guest.assistChurch) {
            //    console.log("first")
            //    setStadisticData( prev => ({ ...prev, assistToChucrh: prev.assistToChucrh + 1 }));
            // } else {
            //    setStadisticData( prev => ({ ...prev, notAssistToChucrh: prev.notAssistToChucrh + 1 }));
            // }

            if (guest.assist) {
               setStadisticData(prev => ({ ...prev, assistsToWedding: prev.assistsToWedding + 1 }));
            } else {
               setStadisticData(prev => ({ ...prev, notAssistsToWedding: prev.notAssistsToWedding + 1 }));
            }

            if (guest.partner) {
               setStadisticData(prev => ({ ...prev, partner: [...prev.partner, { fullName: guest.fullName, partnerName: guest.partnersName, partnerId: guest._id }] }));
            }

            if (guest.childrens) {
               setStadisticData( prev => ({ ...prev, totalChildrens: prev.totalChildrens + guest.childrensQuantity }) );
            }

            if (guest.dietaryRestrictions) {
               setStadisticData(prev => ({ ...prev, foodRestrictions: prev.foodRestrictions + 1 }));
            }

            if(guest.assist && guest.partner && guest.childrens){
               setStadisticData(prev => ({ ...prev, totalAssists: prev.totalAssists + 1 + guest.childrensQuantity + ( (guest.partnersName).length ) }));
            } else if(guest.assist && guest.partner){
               setStadisticData(prev => ({ ...prev, totalAssists: prev.totalAssists + 1 + (guest.partnersName).length  }));
            } else if(guest.assist && guest.childrens){
               setStadisticData(prev => ({ ...prev, totalAssists: prev.totalAssists + 1 + guest.childrensQuantity }));
            } else if(guest.assist){
               setStadisticData(prev => ({ ...prev, totalAssists: prev.totalAssists + 1 }));
            } 
            
            if(guest.assistChurch && guest.partner && guest.childrens){
               setStadisticData(prev => ({ ...prev, assistToChucrh: prev.assistToChucrh + guest.childrensQuantity + 2 }));
            } else if(guest.assistChurch && guest.partner){
               setStadisticData(prev => ({ ...prev, assistToChucrh: prev.assistToChucrh + 2 }));
            } else if(guest.assistChurch){
               setStadisticData(prev => ({ ...prev, assistToChucrh: prev.assistToChucrh + 1 }));
            }

            if(!guest.assist){
               setStadisticData(prev => ({ ...prev, totalNoAssists: prev.totalNoAssists + 1 }));
            }

            if(!guest.partner){
               setStadisticData(prev => ({ ...prev, totalNoPartners: prev.totalNoPartners + 1 }));
            }

            if(guest.assist){
               setStadisticData(prev => ({ ...prev, totalAssistSingleNumber: prev.totalAssistSingleNumber + 1 }));
            }

            if(guest.partner){
               setStadisticData(prev => ({ ...prev, totalPartnersNumber: prev.totalPartnersNumber + guest.partnersName.length }));
            }

            setExecuted(true);
         })
      }
   }

   console.log(stadisticData);

   useEffect(() => {
      handleData();
   }, [])

   useEffect(() => {
      handleStadistic();
   }, [fullData])

   useEffect(() => {
      console.log(foundGuests);
      if(Object.keys(foundGuests).length !== 0){
         Swal.fire({
            title: foundGuests?.fullName,
            html: `<table class="w-fit flex mx-auto">
               <tbody>
                  <tr class="flex justify-between px-3 gap-3 border border-violet-300">
                     <td class="font-bold">Contacto:</td>
                     <td>${foundGuests?.phone}</td>
                  </tr>
                  <tr class="flex justify-between px-3 gap-3 border border-violet-300">
                     <td class="font-bold">Asiste:</td>
                     <td>${foundGuests?.assist ? "Si " : "No " }${foundGuests?.assistChurch ? "(iglesia)" : "(salón)" }</td>
                  </tr>
                  <tr class="flex justify-between px-3 gap-3 border border-violet-300">
                     <td class="font-bold">Acompañantes:</td>
                     <td>${(foundGuests?.partnersName).length}</td>
                  </tr>
                  ${ (foundGuests?.partnersName).map( guest => {
                     return `<tr class="flex justify-between px-3 gap-3 border border-violet-300">
                        <td class="font-bold">Acompañante:</td>
                        <td>${guest}</td>
                     </tr>`
                  })}
                  <tr class="flex justify-between px-3 gap-3 border border-violet-300">
                     <td class="font-bold">Hijos:</td>
                     <td>${foundGuests?.childrensQuantity}</td>
                  </tr>
                  <tr class="flex justify-between px-3 gap-3 border border-violet-300">
                  <td class="font-bold">Resticciones:</td>
                  <td>${foundGuests?.dietaryRestrictions ? "Si" : "No" }</td>
                  ${
                     foundGuests?.dietaryRestrictions ? `<tr class="border border-violet-300">
                     <td class="px-3">${foundGuests?.dietaryRestrictionsIndications}</td>
                     </tr>` : ""
                  }
               </tr>
               </tbody>
            </table>`,
            icon: "info"
         });
      }

   }, [foundGuests])

   return (
      <>
         <div className="min-h-screen bg-gray-200">

            {/* ----- SIDE MENU ----- */}
            <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
               <div className="relative border-b border-white/20">
                  <a className="flex items-center gap-4 py-6 px-8" href="#/">
                     <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Material Tailwind Dashboard</h6>
                  </a>
                  <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                     <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                     </span>
                  </button>
               </div>
               <div className="m-4">
                  <ul className="mb-4 flex flex-col gap-1">
                     <li>
                        <a aria-current="page" className="active" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                 <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
                           </button>
                        </a>
                     </li>
                     <li>
                        <a className="" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">profile</p>
                           </button>
                        </a>
                     </li>
                     <li>
                        <a className="" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clipRule="evenodd"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">tables</p>
                           </button>
                        </a>
                     </li>
                     <li>
                        <a className="" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">notifactions</p>
                           </button>
                        </a>
                     </li>
                  </ul>
                  <ul className="mb-4 flex flex-col gap-1">
                     <li className="mx-3.5 mt-4 mb-2">
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">auth pages</p>
                     </li>
                     <li>
                        <a className="" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign in</p>
                           </button>
                        </a>
                     </li>
                     <li>
                        <a className="" href="#">
                           <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                 <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                              </svg>
                              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign up</p>
                           </button>
                        </a>
                     </li>
                  </ul>
               </div>
            </aside>

            <div className="p-4 xl:ml-80">
               <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                  <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                     <div className="capitalize">
                        <nav aria-label="breadcrumb" className="w-max">
                           <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                 <a href="#">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                 </a>
                                 <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                              </li>
                              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                 <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
                              </li>
                           </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">home</h6>
                     </div>
                     <div className="flex items-center">
                        <div className="mr-auto md:mr-4 md:w-56">
                           <div className="relative w-full min-w-[200px] h-10">
                              <input className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Type here</label>
                           </div>
                        </div>
                        <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                           <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="h-6 w-6 text-blue-gray-500">
                                 <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
                              </svg>
                           </span>
                        </button>
                        <a href="#">
                           <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                 <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                              </svg>Sign In </button>
                           <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                                 </svg>
                              </span>
                           </button>
                        </a>
                        <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                           <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                 <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                              </svg>
                           </span>
                        </button>
                        <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                           <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                 <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"></path>
                              </svg>
                           </span>
                        </button>
                     </div>
                  </div>
               </nav>
               <div className="mt-12">

                  {/* ----- CARDS BLOCK SECTION ----- */}
                  <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

                     {/* ----- CARD 1 ----- */}
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                           <ChurchIcon />
                        </div>
                        <div className="p-4 text-right">
                           <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Confirmados a la iglesia</p>
                           <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"> {stadisticData.assistToChucrh} </h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                           <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                              <strong className="text-fuchsia-500">{Math.round((stadisticData?.assistToChucrh * 100) / 175)}%</strong>&nbsp;de los invitados asistirá
                           </p>
                        </div>
                     </div>

                     {/* ----- CARD 2 ----- */}
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                           <CheckIcon />
                        </div>
                        <div className="p-4 text-right">
                           <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Personas invitadas</p>
                           <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"> 175 </h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                           <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                              <strong className="text-fuchsia-500">{Math.round((stadisticData?.totalAssists * 100) / 175)}%</strong>&nbsp;asistirán a la boda
                           </p>
                        </div>
                     </div>

                     {/* ----- CARD 3 ----- */}
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                           </svg>
                        </div>
                        <div className="p-4 text-right">
                           <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total de invitados confirmados</p>
                           <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{stadisticData.totalAssists}</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                           <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                              <strong className="text-fuchsia-500">{stadisticData?.totalChildrens}</strong> son niños.
                           </p>
                        </div>
                     </div>

                  </div>

                  {/*  ----- MESSAGE DATA TABLE ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">MENSAJES ❤</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{(fullData?.filter(guest => guest.message)).length} mensajes</strong> en total
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-400">Invitado</p>
                                    </th>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-gray-400">Mensaje</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {

                                    fullData?.filter(guest => guest.message).slice(0, visibleItems).map(guest => (
                                       // <tr key={guest?._id}>
                                       //    {/* Renderizar datos de cada invitado */}
                                       // </tr>
                                    // fullData?.filter( guest => guest.message ).map( guest => (

                                       <tr key={guest?._id}>
                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <div className="flex items-start gap-4 w-fit">
                                                <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                                </a>
                                                
                                             </div>
                                          </td>

                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> {guest?.message}</p>
                                          </td>
                                       </tr>

                                    ))
                                 }
                              </tbody>
                           </table>

                                 <div className="w-full flex justify-center items-center gap-4 pt-4 pb-3">
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <AddCircleIcon fontSize='large' className='cursor-pointer' onClick={handleShowMore} sx={{ color: 'blueviolet' }}/>
                                       )
                                    }
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <RemoveCircleIcon fontSize='large' onClick={handleShowLess} className='cursor-pointer' sx={{ color: 'lightgray' }} />
                                       )
                                    }
                                 </div>


                        </div>
                     </div>
                  </div>

                  {/*  ----- PARTNERS TABLE DATA ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-slate-100 text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">ACOMPAÑANTES 👫</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{(stadisticData?.partner).length} invitados</strong> confirmaron acompañantes.
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-violet-500">Invitado</p>
                                    </th>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-violet-500">Pareja</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {
                                    fullData?.filter(guest => guest.message).slice(0, visibleItems).map(guest => (
                                    // stadisticData?.partner?.map( guest => (

                                       <tr key={guest?._id}>
                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <div className="flex items-start gap-4 w-48">
                                             <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                                </a>
                                             </div>
                                          </td>

                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> {(guest?.partnersName).length == 1 ? guest?.partnersName : <span className="text-red-500 italic">Sin pareja</span>}</p> 
                                          </td>
                                       </tr>

                                    ))
                                 }

                              </tbody>
                           </table>
                           <div className="w-full flex justify-center items-center gap-4 pt-4 pb-3">
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <AddCircleIcon fontSize='large' className='cursor-pointer' onClick={handleShowMore} sx={{ color: 'blueviolet' }}/>
                                       )
                                    }
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <RemoveCircleIcon fontSize='large' onClick={handleShowLess} className='cursor-pointer' sx={{ color: 'lightgray' }} />
                                       )
                                    }
                                 </div>
                        </div>
                     </div>
                  </div>

                  {/*  ----- FOOD TABLE DATA ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">COMIDA 🥗🍖</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{stadisticData?.foodRestrictions} restricciones</strong> en total.
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-400">Invitado</p>
                                    </th>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-gray-400">Restricción</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {
                                       fullData?.filter( guest => guest.dietaryRestrictions ).map( guest => (

                                          <tr key={guest?._id}>
                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="flex items-start gap-4 w-48">
                                                <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                                </a>
                                                </div>
                                             </td>

                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> {guest?.dietaryRestrictionsIndications}</p>
                                             </td>
                                          </tr>

                                       ))
                                    }

                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  {/*  ----- CHILDRENS TABLE DATA ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-slate-100 text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">NIÑOS 👩‍👩‍👧‍👦</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{stadisticData?.totalChildrens} niños</strong> en total.
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-violet-500">Invitado</p>
                                    </th>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-violet-500">Cantidad de niños</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {
                                       fullData?.filter( guest => guest.childrens ).map( guest => (

                                          <tr key={guest?._id}>
                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="flex items-start gap-4 w-48">
                                                <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                                </a>
                                                </div>
                                             </td>

                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> {guest?.childrensQuantity}</p>
                                             </td>
                                          </tr>

                                       ))
                                    }

                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  {/*  ----- CHURCH TABLE DATA ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">IGLESIA 💒</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{ stadisticData?.assistToChucrh } invitados </strong> asistirán a la iglesia.
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-gray-400">Invitado</p>
                                    </th>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-gray-400">Cantidad</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {
                                       fullData?.filter(guest => guest.message).slice(0, visibleItems).map(guest => (
                                       // fullData?.filter( guest => guest.assistChurch ).map( guest => (

                                          <tr key={guest?._id}>
                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="flex items-start gap-4 w-48">
                                                <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                                </a>
                                                </div>
                                             </td>

                                             <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> { 1 + (guest?.childrensQuantity) +(guest?.partner? ( (guest.partnersName).length ) : 0 ) }</p>
                                             </td>
                                          </tr>

                                       ))
                                    }

                              </tbody>
                           </table>
                           <div className="w-full flex justify-center items-center gap-4 pt-4 pb-3">
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <AddCircleIcon fontSize='large' className='cursor-pointer' onClick={handleShowMore} sx={{ color: 'blueviolet' }}/>
                                       )
                                    }
                                    {
                                       fullData?.filter(guest => guest.message).length > visibleItems && (    
                                          <RemoveCircleIcon fontSize='large' onClick={handleShowLess} className='cursor-pointer' sx={{ color: 'lightgray' }} />
                                       )
                                    }
                                 </div>
                        </div>
                     </div>
                  </div>

                  {/*  ----- SINGLES TABLE DATA ----- */}
                  <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                     <div className="relative flex flex-col bg-clip-border rounded-xl bg-slate-100 text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                           <div>
                              <h6 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-purple-600 mb-1 text-left">SIN ACOMPAÑANTSE 🙍🏻‍♀️</h6>
                              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                 </svg>
                                 <strong>{(fullData?.filter( guest => !guest.partner).length)} invitados</strong> sin acompañantes.
                              </p>
                           </div>
                           <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                 </svg>
                              </span>
                           </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                           <table className="w-full table-auto">
                              <thead>
                                 <tr>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] font-medium uppercase text-violet-600">Invitado</p>
                                    </th>
                                    <th className="border-b border-gray-50 py-3 px-6 text-left">
                                       <p className="block antialiased font-sans text-[11px] text-center font-medium uppercase text-violet-600">Pareja</p>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>

                                 {
                                    fullData?.filter( guest => !guest.partner).map( guest => (

                                       <tr key={guest?._id}>
                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <div className="flex items-start gap-4 w-48">
                                             <a onClick={() => guestIndividualData(guest?._id)} className="cursor-pointer">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"> {guest?.fullName} </p>
                                             </a>
                                             </div>
                                          </td>

                                          <td className="py-3 px-5 border-b border-blue-gray-50">
                                             <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600"> sin acompañante</p>
                                          </td>
                                       </tr>

                                    ))
                                 }

                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

               </div>

               <div className="text-gray-600">
                  <footer className="py-2">
                     Footer
                  </footer>
               </div>

            </div>
         </div>

      </>
   )
}

export default Layout
