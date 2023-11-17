import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardMedia, CardContent, Typography, IconButton, Container, Paper, Grid, } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Solicitud a la API para obtener los productos.
const fetchProduct = async (id) => {
    const response = await fetch(`https://coding-challenge-api.aerolab.co/products/`, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2OTg5Njk5YjQ2YzAwMjAzZmU0YmIiLCJpYXQiOjE2OTkxMjUzOTh9.Kcvbaq3nllqd0cDqai-CyP6OGssXPydTrGAWrD3PigQ'
        },
    })
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const products = await response.json();
    const product = products.find(product => product._id === id);
    
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return product;
};

const ProductDetails = () => {
  const [match, params] = useRoute("/product/:id");
  // Realiza la solicitud de productos específicos y gestiona el estado.
  const { 
      data: product,
      isLoading,
      error,
  } = useQuery({ 
    queryKey: ["product", params.id],
    queryFn: () => fetchProduct(params.id),
  });
  // Renderizan un mensaje de carga mientras se obtiene la información del producto
  if (isLoading) {
    return (
      <Typography align='center' variant='h6'>
        Loading...
      </Typography>
    );
  }
  // Renderiza un mensaje de error si ocurre algún problema al obtener el producto.
  if (error) {
    return (
      <Typography align='center' variant='h6'>
        Error fetching Products! {error.message}
      </Typography>
    );
  }
  // Renderiza la informacion del producto.
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f0f0f0" }}>
        <Link href="/">
          <IconButton color="primary" sx={{ marginBottom: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="340"
                image={product.img.hdUrl}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Category: {product.category}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Price: ${product.cost}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
