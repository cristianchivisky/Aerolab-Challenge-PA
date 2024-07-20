import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
 
// Create a React context named ProductsContext
const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('all')
    const [totalProducts, setTotalProducts] = useState(0); 
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data from API whenever the category changes
    useEffect(() => {
        const consultApi = async () => {
            setIsLoading(true);
            const url = `https://coding-challenge-api.aerolab.co/products/`
            try{
                // Make a GET request to fetch products data
                const resp = await axios.get(url, {
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2OTg5Mzk5YjQ2YzAwMjAzZmU0YmEiLCJpYXQiOjE2OTkxMjUzOTV9.Wc-Di27XMeuxAwZUZEOs34Luah210Xh3zqAt2ukoP-w'//import.meta.env.VITE_AEROLAB_API_KEY,
                    },
                })
                const data = resp.data
                setProducts(data)
                setTotalProducts(data.length)
                //console.log(data)
                setError(null)
            }catch (error){
                console.error(`Error: ${error}`)
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        };
        consultApi()
    },[category])

    // Filter products based on the selected category
    useEffect(() => {
        if (category === 'all') {
          setFilteredProducts(products);
        } else {
          const filtered = products.filter(product => product.category === category);
          setFilteredProducts(filtered);
        }
      }, [category, products]);

    // Handle category change in the select element
    const handleChangeCategory = e => {
        setCategory(e.target.value)
    }

    // Provide context value to child components
    return ( 
        <ProductsContext.Provider
            value={{
                products: filteredProducts,
                category,
                totalProducts,
                handleChangeCategory,
                error,
                isLoading, 
            }}
        >
            {children}
        </ProductsContext.Provider>
     );
}
 
export {
    ProductsProvider
} 

export default ProductsContext;
    