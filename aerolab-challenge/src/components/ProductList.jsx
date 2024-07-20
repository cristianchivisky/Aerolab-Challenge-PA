import { useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import { Typography, Pagination, Grid, Box, Container } from "@mui/material";
import ProductCard from './ProductCard';
import Form from './Form'
import usePagination from '../hooks/usePagination';
import Loading from './Loading';

const ProductList = () => {
    const { products, isLoading, error, category } = useProducts();
    const itemsPerPage = 16;
    const { currentData, currentPage, jumpToPage, maxPage } = usePagination(products, itemsPerPage);
    const visibleProducts = currentData();

    useEffect(() => {
        // Scroll to 'productos' section on page change
        const productosSection = document.getElementById('productos');
        if (productosSection) {
            productosSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    useEffect(() => {
        // Reset page when category or products change
        jumpToPage(1);
    }, [category, products]);

    return (  
        <>
			<Loading isLoading={isLoading} error={error} message="Error fetching Products!" />
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={3} sx={{ ml: { sm: 3 } }}>
                    <Form />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        textAlign={{ xs: 'center', sm: 'center' }}
                        variant="h3"
                        component="h2"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
                    >
                        Featured Products
                    </Typography>
                </Grid>
                <Grid item xs={false} sm={3} ></Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, p: 2 }} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Grid container spacing={2} justifyContent="center">
                    {visibleProducts.map((product, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} justifyContent="center">
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Grid container justifyContent="center" marginTop={5}>
                <Pagination
                    count={maxPage} 
                    page={currentPage} 
                    onChange={(event, page) => {
                        jumpToPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    color="primary" 
                />
            </Grid>
        </>
    );
}

export default ProductList;
