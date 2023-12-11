import { ModalContext } from "./ModalContext"
import { useState } from "react"

const ModalProvider = ( { children } ) => {

   const [ modal, setModal ] = useState(false)
   const [ musicModal, setMusicModal ] = useState(false)
   const [ confirmationModal, setConfirmationModal ] = useState(false)

   return (
      <ModalContext.Provider value={ { modal, setModal, musicModal, setMusicModal, confirmationModal, setConfirmationModal } }>
         {children}
      </ModalContext.Provider>
   )
}

export default ModalProvider