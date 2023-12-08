import Layout from "./pages/Layout"
import ModalProvider from "./context/ModalProvider"

function App() {


  return (
      <ModalProvider>
        <Layout/>
      </ModalProvider>
  )
}

export default App
