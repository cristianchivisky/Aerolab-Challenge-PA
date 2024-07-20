import { Box, Typography, Container, Grid, Tooltip } from '@mui/material';

const TECHLOGOS = [
    { src: '/img/nodejs.svg', alt: 'Node.js' },
    { src: '/img/react.svg', alt: 'React' },
    { src: '/img/axios.svg', alt: 'Axios' },
    { src: '/img/mui.svg', alt: 'MUI' },
    { src: '/img/netlify.svg', alt: 'Netlify' },
];

const Footer = () => {

    return (
        <Box
        sx={{
            py: 2,
            px: 2,
            mt: 4,
            backgroundColor: '#e8e8e8',
            color: 'text.secondary',
        }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="center">
                    {TECHLOGOS.map((logo) => (
                        <Grid item key={logo.alt}>
                            <Tooltip title={logo.alt} placement="top" arrow>
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    style={{ height: 22, cursor: 'pointer' }}
                                />
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    © {new Date().getFullYear()} Created by Cristian Chivisky.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
