import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
 

const ProductosContext = createContext()

const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([])
    const [categoria, setCategoria] = useState('all')
    const [totalProductos, setTotalProductos] = useState(0); 
    const [error, setError] = useState(null)

    useEffect(() => {
        const consultarApi = async () => {
            const url = `https://coding-challenge-api.aerolab.co/products/`
            //const id = '5a0b368e734d1d08bf708558'
            try{
                const resp = await axios.get(url, {
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2OTg5Mzk5YjQ2YzAwMjAzZmU0YmEiLCJpYXQiOjE2OTkxMjUzOTV9.Wc-Di27XMeuxAwZUZEOs34Luah210Xh3zqAt2ukoP-w'//import.meta.env.VITE_AEROLAB_API_KEY,
                    },
                })
                const data = resp.data
                setProductos(data)
                setTotalProductos(data.length)
                console.log(data)
                setError(null)
            }catch (error){
                console.error(`Error: ${error}`)
                setError(error.message)
            }
            
        
        }
        consultarApi()
    },[categoria])

   
    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }


    return ( 
        <ProductosContext.Provider
            value={{
                productos,
                categoria,
                totalProductos,
                handleChangeCategoria,
                error
            }}
        >
            {children}
        </ProductosContext.Provider>
     );
}
 
export {
    ProductosProvider
} 

export default ProductosContext;
    