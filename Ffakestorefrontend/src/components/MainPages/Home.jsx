

const BASE_API = "https://www.fakestoreapi.com/"

function Home(){
    
    const [allProducts, setAllProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useState(() => {
        //fill up allProducts with all the products
        getAllProducts().then(products => {
            setError(false)
            setAllProducts(products)
            
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        })


    }, [])

    useState(() => {

        //filters by category and searchText. returns a new list;
        setAllProducts(filterAllProducts(category, search, allProducts));
    }, [category, search])



}

//returns a new list of all the filtered products.
function filterAllProducts(category, search, allProducts){

    const filteredProducts = []


    allProducts.forEach(product => {
        if(product.category == category && product.title.toLowerCase().includes(search.toLowerCase())){
            filteredProducts.push(product);
        }
    })


    return filteredProducts;
}

//returns a list of all products
async function getAllProducts(){
    
    try{
    const fulfilledPromise = await fetch(BASE_API + "products");
    const productsJson = await fulfilledPromise.json();

    return productsJson;
    }catch(error){
        throw error;
    }
}

function InputFields({search, category, setSearch, setCategory}){

}



function AllProducts({allProducts}){
    

    //contains lists of category -> list of products
    const categoryMap = categoryMap;



    // for every category, create a Category Section.

    return <>
    </>



}


function CategorySection({category, filteredProducts}){
    return <>
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
    
}






