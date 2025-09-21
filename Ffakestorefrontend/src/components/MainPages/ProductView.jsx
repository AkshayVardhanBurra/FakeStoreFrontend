import { useParams } from "react-router";
import { useState, useEffect } from "react";



const BASE_API = "https://fakestoreapi.com/products/"

export function ProductView(){

    const {id} = useParams()
    console.log(id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);

    useEffect(() => {
        console.log("called here!")
        getProduct(id).then(product => {
            console.log(product);
            setError(null);
            setProduct(product);
        }).catch(error => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })

    }, [])


    if(loading){
        return <div>
            Product is loading....
        </div>
    }else if(error){
        return <div>
            There was an error: {error};
        </div>
    }else{
        return <div>
           
            <h2> {product.title} </h2>
            <h4> Price: {product.price} </h4>
            <h4> Description: </h4>
            <p>
                {product.description}
            </p>
        </div>
    }


}

//returns a product using the id
async function getProduct(id){

    try{
        const fulfilledPromise = await fetch(BASE_API + "id");
        const product = await fulfilledPromise.json()
        return product
    }catch(error){
        throw error;
    }


}