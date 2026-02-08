import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Chef en Casa
                </Link>{' '}
                {new Date().getFullYear()}
                {'. Proyecto Final DAD - 2º DAM SEMI Leandro A. Trilnick Sculsky .'}
            </Typography>
        </Box>
    );
};

export default Footer;
