import { ModalContext } from "./ModalContext"
import { useState } from "react"

const ModalProvider = ( { children } ) => {

   const [ modal, setModal ] = useState(false)

   return (
      <ModalContext.Provider value={ { modal, setModal } }>
         {children}
      </ModalContext.Provider>
   )
}

export default ModalProvider