import useProducts from '../hooks/useProducts';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, Container, Paper, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from './Loading';

const ProductDetails = () => {
  const { id } = useParams(); 
  //console.log(id)
  // Access products and possible errors from the context
  const { products, isLoading, error } = useProducts(); 
  const product = products.find(product => product._id === id);

  // Handle case where product is not found
  if (!product) {
    return (
      <Typography align='center' variant='h6' minHeight="100vh">
        Product not found
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }} >
        <Loading isLoading={isLoading} error={error} message="Error fetching Product!" />
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f0f0f0" }}>
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton color="primary" sx={{ marginBottom: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <Grid container spacing={2}>
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
                            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                Category: {product.category}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
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