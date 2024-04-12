import { Typography } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


const fetchProduct = async (id) => {
  //const id = '5a0b368e734d1d08bf708558'
    const response = await fetch(`https://coding-challenge-api.aerolab.co/products/${id}`, {
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

const ProductDetails = () => {
  const [match, params] = useRoute("/product/:id");
  const { 
      data: product,
      isLoading,
      error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => fetchProduct(params.id),
  });
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
    <Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
      <CardMedia sx={{ height: 140 }} image={product.img.hdUrl} title={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $ {product.cost}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
