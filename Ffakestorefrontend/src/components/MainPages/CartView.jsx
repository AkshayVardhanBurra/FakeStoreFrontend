import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router";


const BASE_API = "https://fakestoreapi.com/products/"




export function CartView(){
    const [contextCart, setContextCart] = useOutletContext();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0)

    


    useEffect(() => {
        console.log(cart);

        setContextCart(cart);
        let productsFromIds = null;

        getProductsFromIds(Object.keys(cart)).then(products => {
            productsFromIds = products;
            console.log("here are the products: " + products);
            setProducts(productsFromIds);
            
            setError(null)
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
        
    }, [])


    useEffect(() => {
        setTotalPrice(calculateTotalPrice(cart, products))


    }, [cart, products])


    if(loading){
        return <div>
            Is Loading...
        </div>
    }else if(error){
        return  <div>
            There has been an error loading your cart!
            <Link to="/home"> Go back to Home </Link>
        </div>
    }else{
        return <>

            <div>
                {products.map((product) => {
                    return <ProductView key={product.id} product={product} products={products} setProducts={setProducts} cart={cart} setCart={setCart} setContextCart={setContextCart} />
                })}



            </div>

            <h3> Total Price: {prettifyPrice(totalPrice)} </h3>

            <Link to="/home"> Go back to Home </Link>

        </>
    }
}

//returns a number which is the total price
function calculateTotalPrice(cart, allProducts){

    let totalPrice = 0;
    allProducts.forEach(product => {
        totalPrice += cart[product.id] * product.price;
    })

    return totalPrice;
}

//returns a list of products from the ids.
async function getProductsFromIds(ids){

    const products = [];
    for(let i = 0; i < ids.length; i++){
        try{
        const product = await getProduct(ids[i]);
        products.push(product);
        }catch(error){
            throw error;
        }
    }

    return products;


    
}


function ProductView({cart, setCart, products, setProducts, product, setContextCart}){


    return <div>
        
        <h3> {shortenTitle(product.title, 13)} </h3>
        <img src={product.image} />
        <h4> Price: {prettifyPrice(product.price)}</h4>
        <Link to={"/products/" + product.id}> Visit Page </Link>
        <input type="number" min="1" value={cart[product.id]} onChange={(e) => {
            cart[product.id] = e.target.value;
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart({...cart});
            setContextCart({...cart})
        }} />

        <button onClick={(e) => {
            products.splice(products.indexOf(product), 1);
            delete cart[product.id];
            console.log("length of cart = " + Object.keys(cart).length);
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart({...cart});
            setContextCart({...cart});
            setProducts([...products])
            
        }}> Delete </button>
    </div>
}

function prettifyPrice(price){
    return `$${Number(price).toFixed(2)}`;
}


function shortenTitle(title, chars){
    if(title.length < chars){
        return title;
    }else{
        return title.substring(0, chars-3) + "...";
    }
}

//returns product json
async function getProduct(id){

    try{
    const fulfilledPromise = await fetch(BASE_API + id);
    const product = await fulfilledPromise.json()
    


    return product;
    }catch(error){
        throw error;
    }
}