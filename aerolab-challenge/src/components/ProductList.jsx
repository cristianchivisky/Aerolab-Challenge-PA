import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Typography, Pagination, Grid, Box } from "@mui/material";
import Product from './Product';

// Solicitud a la API para obtener los productos.
const fetchProducts = async () => {
    const response = await fetch(`https://coding-challenge-api.aerolab.co/products/`, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2OTg5Njk5YjQ2YzAwMjAzZmU0YmIiLCJpYXQiOjE2OTkxMjUzOTh9.Kcvbaq3nllqd0cDqai-CyP6OGssXPydTrGAWrD3PigQ'
        },
    });
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const ProductList = () => {
	// Obtención de datos con React Query.
	const { data: products, isLoading, error } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts
	});
	const [currentPage, setCurrentPage] = useState(1);
	
	// Maneja el cambio de página en la paginación.
	const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
	//console.log(products)
	// Realiza un desplazamiento al componente con el id 'productos' al cambiar de página
	useEffect(() => {
		const productosSection = document.getElementById('productos');
		if (productosSection) {
		productosSection.scrollIntoView({ behavior: 'smooth' });
		}
	}, [currentPage]);

	// Se manejan los estados de carga y errores.
	if (isLoading) {
		return (
			<Typography align='center' variant='h6'>
				Loading...
			</Typography>
		);
	}
	if (error) {
		return (
			<Typography align='center' variant='h6'>
			Error fetching Products! {error.message}
			</Typography>
		);
	}
	
	// Cálculos para la paginación y la selección de productos visibles.
	const itemsPerPage = 16;
	const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (  
		<>  
			<Box position="relative">
				<img
					src="/img/header-x1.png"
					alt="Imagen Header"
					style={{ width: '100%', height: 'auto' }}
				/>
				<Box
					position="absolute"
					bottom={0}
					left={0}
					color="white"
					p={7} 
				>
					<Typography variant="h3" fontWeight="bold">Electronic</Typography>
				</Box>
			</Box>
			<Grid item xs={12} id="productos">
				<Typography
					textAlign={'center'}
					margin={2}
					variant='h3'
					component={'h2'}
				>
					Featured Products
				</Typography>
			
				<Grid
					container
					margin="auto"
					spacing={2}
					justifyContent="center"
					marginTop={5}
				>
					{visibleProducts.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</Grid>
			</Grid>
            <Grid container justifyContent="center" marginTop={5}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                />
            </Grid>
		</>
	);
}
            
export default ProductList;