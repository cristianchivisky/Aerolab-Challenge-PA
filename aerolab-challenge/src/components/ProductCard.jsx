import {Card, CardMedia, CardContent, CardActions, Typography, Button }from '@mui/material';
import { Link } from 'react-router-dom'; 

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 290, margin: 'auto', backgroundColor: '#e8e8e8', '&:hover': { boxShadow: 6, cursor: 'pointer', }, }} >
            <Link to={`/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </Link>
        </Card>
    );
};

export default ProductCard;