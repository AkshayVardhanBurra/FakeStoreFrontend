import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Home} from "./components/MainPages/Home"
import {ProductView} from "./components/MainPages/ProductView"
import { Outlet } from 'react-router'
import { Link } from 'react-router'





function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  return (
    <>
      <NavBar cart={cart}/>
      <Outlet context={[cart, setCart]} />
    </>
  )
}


function NavBar({cart}){
  
  return <nav>
    <h3> <Link to="/cart">Cart: {Object.keys(cart).length} </Link> </h3>
  </nav>
}
export default App
