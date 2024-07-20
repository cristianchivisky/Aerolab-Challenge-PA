import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navbar = () => {

    return (
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
            p={{ xs: 2, sm: 4, md: 6, lg: 8 }}
            >
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h3" fontWeight="bold" sx={{fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem',}, }}>
                    Electronic
                </Typography>
            </Link>
            </Box>
        </Box>
    );
};

export default Navbar;
