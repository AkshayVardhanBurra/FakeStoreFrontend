import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Home} from "./components/MainPages/Home"
import {ProductView} from "./components/MainPages/ProductView"
import { Outlet } from 'react-router'
import { Link } from 'react-router'
import styles from './styles/mainstyle.module.css'




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
  
  return <nav className={styles.navbar}>
    <h3> <Link to="/cart">Cart: {Object.keys(cart).length} </Link> </h3>
  </nav>
}
export default App
