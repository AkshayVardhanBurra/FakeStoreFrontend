import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { Home } from './components/MainPages/Home.jsx'
import { ProductView } from './components/MainPages/ProductView.jsx'
import { CartView } from './components/MainPages/CartView.jsx'

import { createBrowserRouter, RouterProvider } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path:"home", element:<Home />},
      {path:"products/:id", element:<ProductView />},
      {path:"cart", element:<CartView />},
      {index:true, element:<Home />}
      
    ]

    
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>,
)
