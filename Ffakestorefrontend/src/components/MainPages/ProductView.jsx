import { Link, useParams, useOutletContext } from "react-router";
import { useState, useEffect } from "react";



const BASE_API = "https://fakestoreapi.com/products/"

export function ProductView(){


    
    const {id} = useParams();
    const [cart, setCart] = useOutletContext();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);
    const [numCart, setNumCart] = useState(0);

    useEffect(() => {
        console.log("called here!")
        getProduct(id).then(product => {
            console.log(product);
            setError(null);
            setProduct(product);
        }).catch(error => {
            console.log("found here nigga")
            setError(error);
        }).finally(() => {
            setLoading(false);
        })

    }, [])


    if(loading){
        return (<div>
            <p> Product is loading.... </p>
        </div>)
    }else if(error){
        return (<div>
            There was an error: {error};
            <Link to="/"> Back Home </Link>
        </div>)
    }else{
        return (<div>
           
            <img src={product.image} />
            <h2> {product.title} </h2>
            <h4> Price: {prettifyPrice(product.price)} </h4>
            <h4> Description: </h4>
            <p>
                {product.description}
            </p>
            <input type="number" min="1" max="100" value={numCart} onChange={ (e) => {
                setNumCart(e.target.value);
            }}/>
            <button onClick={() => {
                if(! (product.id in cart)){
                    cart[product.id] = 0;
                    
                }
                
                cart[product.id] = Number(cart[product.id]) + Number(numCart);
                localStorage.setItem("cart", JSON.stringify(cart));
                setCart({...cart});
                console.log(cart);
            }}> Add to Cart </button>
            <Link to="/"> Back Home </Link>
        </div>)
    }


}

//displays it in a pretty format.
function prettifyPrice(price){
    return `$${Number(price).toFixed(2)}`;
}

//returns a product using the id
async function getProduct(id){

    try{
        console.log("here is the full url: " + BASE_API + id);
        const fulfilledPromise = await fetch(BASE_API + id);
        const product = await fulfilledPromise.json()
        return product
    }catch(error){
        throw error;
    }


}