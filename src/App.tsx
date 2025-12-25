import { Route, Routes } from "react-router-dom"
import { PagesOne } from "./pages/PagesOne/PagesOne"
import { PagesTwo } from "./pages/PagesTwo/PagesTwo"
import { Header } from "./components/Header/Header"




function App() {


  

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<PagesOne />}/>
        <Route path="/list" element={<PagesTwo />}/>
      </Routes>
    </div>
  )
}

export default App
