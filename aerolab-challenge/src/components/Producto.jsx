//import {Link} from 'react-router-dom';
import { 
    Grid, 
    CardMedia, 
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    Link
    } from '@mui/material';

const Productos = ({ producto }) => {

        const { img, name,  category } = producto;

    return ( 

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                {
                    img && (
                    <CardMedia
                        component="img"
                        alt={`Imagen del producto ${name}`}
                        image={img.hdUrl}
                        height={'250'}
                    />

                    )
                }
         

            <CardContent>
                <Typography variant='h5' color='error'>
                    {category}
                </Typography>
                
                <Typography variant='h5' color='error'>
                    {name}
                </Typography>
            </CardContent>

            <CardActions>
                <Link to={`/producto/${producto._id}`} >
                    Ver más
                </Link>
            </CardActions>
        </Card>
        </Grid>

     );
}
 
export default Productos;