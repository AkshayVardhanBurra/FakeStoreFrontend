
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const BASE_API = "https://fakestoreapi.com/"





export function Home(){

    const [allProducts, setAllProducts] = useState([]);
    const [usableProducts, setUsableProducts] = useState([])
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //fill up allProducts with all the products
        getAllProducts().then(products => {
            console.log(products);
            setError(false)
            setAllProducts(products);
            setUsableProducts(products);
            console.log(getCategories(products));
            setCategories(getCategories(products));
            
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        })


    }, [])

    useEffect(() => {

        //filters by category and searchText. returns a new list;
       const filteredProducts = filterAllProducts(category, search, usableProducts);
       console.log(filteredProducts);

        setAllProducts(filteredProducts);
    }, [category, search])


    if(loading){
        return <div> Is Loading... </div>
    }else if(error){
        return <div> Error occured: {error} </div>
    }else{
        return <div>
                <InputFields search={search}
                category={category}
                setSearch={setSearch}
                setCategory={setCategory}
                allCategories={categories}
                />

                All Products:
                <AllProducts allProducts={allProducts} />
             </div>
    }



}

function prettifyPrice(price){
    return `$${Number(price).toFixed(2)}`;
}

function getCategories(products){
    const categories = new Set();

    products.forEach(product => {
        if(!categories.has(product.category)){
            categories.add(product.category);
        }
    });

    
    return getListFromSet(categories)

    
}


function getListFromSet(productSet){
    const productList = []

    productSet.forEach(product => {
        productList.push(product)
    })

    return productList;
}



//returns a new list of all the filtered products.
function filterAllProducts(category, search, allProducts){

    const filteredProducts = []


    allProducts.forEach(product => {
        //replace includes with startwith if you want to check only starting.
        if(category == "All" && (product.title.toLowerCase().includes(search.toLowerCase()) || search.trim() == "")){
            filteredProducts.push(product)
            
        }
        //replace includes with startwith if you want to check only the starting.
        else if(product.category == category && (product.title.toLowerCase().includes(search.toLowerCase()) || search.trim() == "")){
            filteredProducts.push(product);
        }
    })


    return filteredProducts;
}

//returns a list of all products
async function getAllProducts(){
    
    try{
        const fulfilledPromise = await fetch(BASE_API + "products", { mode: "cors" });
        const productsJson = await fulfilledPromise.json();

    return productsJson;
    }catch(error){
        throw error;
    }
}

function InputFields({search, category, setSearch, setCategory, allCategories}){

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="myDropdown">Choose an option:</label>
            <select value={category} id="myDropdown" onChange={e => {
                setCategory(e.target.value);
                console.log("here!!!")
            }}>
                {allCategories.map(categoryI => {
                    
                        return <option key={categoryI} value={categoryI}> {categoryI} </option>
                   
                        
                    
                })}

                <option value="All"> All </option>
            </select>


            <input type="text" value={search} onChange={e => {
                console.log("changed!")
                setSearch(e.target.value)}} />
            
        </form>
    </>
}



function AllProducts({allProducts}){
    

    //contains lists of category -> list of products
    const categoryMap = generateCategoryMap(allProducts);



    // for every category, create a Category Section.

    return <>

        {Object.keys(categoryMap).map(category => {
            return <CategorySection key={category} category={category} filteredProducts={categoryMap[category]} />
        })}
    </>



}


function CategorySection({category, filteredProducts}){
    return <>
        <h3> {category} </h3>

        {filteredProducts.map(product => {
            return <ProductCard key={product.id} product={product} />
        })
        }
    </>
}

function generateCategoryMap(allProducts){

    const categoryMap = {}

    allProducts.forEach(product => {
        if(!(product.category in categoryMap)){
            categoryMap[product.category] = [product]
        }else{
            categoryMap[product.category].push(product)
        }
    })

    return categoryMap

}


function ProductCard({product}){
    

    const navigate = useNavigate();
    return <div>
        <div id="clickable-section" onClick={() => {
            navigate("/products/" + product.id);
        }}>
        <h3> {product.title} </h3>
        <img src={product.image} />
        <p>
            {prettifyPrice(product.price)}
        </p>
        </div>
    </div>
}






