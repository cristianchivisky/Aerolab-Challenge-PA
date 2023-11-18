import { Link } from 'wouter';
import {Card, Grid, CardMedia, CardContent, CardActions, Typography, Button }from '@mui/material';

const Product = ({ product }) => {
  return (
    <Grid item xs={10} sm={6} md={4} lg={3} key={product._id}>
      <Link href={`/product/${product._id}`}>
        <Card sx={{ maxWidth: 290, backgroundColor: '#e8e8e8' }}>
          <CardMedia sx={{ height: 220 }} image={product.img.hdUrl} title={product.name} />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.category}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">See Details</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
};

export default Product;
