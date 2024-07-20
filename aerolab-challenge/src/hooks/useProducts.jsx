import { useContext } from "react";
import ProductsContext from "../context/ProductsProvider";

const useProducts = () => {
    // Use the useContext hook to access the context value
    const context = useContext(ProductsContext);

    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }

    return context;
}
 
export default useProducts;