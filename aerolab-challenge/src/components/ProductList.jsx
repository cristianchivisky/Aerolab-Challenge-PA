import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Pagination } from '@mui/material';
import { Link } from "wouter";
import Stack from "@mui/material/Stack";

const fetchProducts = async (page) => {
    const response = await fetch(`https://coding-challenge-api.aerolab.co/products/?page=${page}`, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2OTg5Mzk5YjQ2YzAwMjAzZmU0YmEiLCJpYXQiOjE2OTkxMjUzOTV9.Wc-Di27XMeuxAwZUZEOs34Luah210Xh3zqAt2ukoP-w'//import.meta.env.VITE_AEROLAB_API_KEY,
        },
    })
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const ProductList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1); // Puedes obtener esto de la respuesta de la API
	const itemsPerPage = 16;
	const {
		data: products,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products", currentPage],
		queryFn: () => fetchProducts(currentPage),
		onSucces: (data) => {
			setTotalPages(Math.ceil(data.length / itemsPerPage));
		}
	});
	const handleChangePagina = (event, value) => {
		setCurrentPage(value);
	};
	if (isLoading) {
		return (
			<Typography align='center' variant='h6'>
			Cargando...
			</Typography>
		);
	}
	if (error) {
		return (
			<Typography align='center' variant='h6'>
			Error fetching ConsultarApi! {error.message}
			</Typography>
		);
	}
    return (  
        <>            
            <Typography variant="h4" component="h2">
                Productos Destacados
			</Typography>
			;
			<Stack spacing={2}>
				{products.map((product) => (
					<Link key={product.id} href={`/product/${product.id}`}>
						<Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
							<CardMedia
								sx={{ height: 140 }}
								image={product.imgUhd}
								title={product.name}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{product.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{product.category}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">See Details</Button>
							</CardActions>
						</Card>
					</Link>
				))}
			</Stack>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePagina}
                color='primary'
                size='large'
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}

            />
		</>
	);
};
            
export default ProductList;