import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Home} from "./components/MainPages/Home"
import {ProductView} from "./components/MainPages/ProductView"
import { Outlet } from 'react-router'





function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <NavBar cart={cart}/>
      <Outlet context={[cart, setCart]} />
    </>
  )
}


function NavBar({cart}){
  
  return <nav>
    <h3> Cart: {Object.keys(cart).length} </h3>
  </nav>
}
export default App
