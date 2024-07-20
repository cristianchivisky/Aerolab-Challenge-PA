import React from 'react';
import { Typography, Container } from '@mui/material';

const LoadingError = ({ isLoading, error, message }) => {
    if (isLoading) {
        return (
            <Typography align='center' variant='h6' minHeight="100vh">
                Loading...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography align='center' variant='h6' minHeight="100vh">
                {message} {error.message}
            </Typography>
        );
    }

    return null;
};

export default LoadingError;
