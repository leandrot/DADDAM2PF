import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const LandingPage = () => {
    return (
        <React.Fragment>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <RestaurantIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Chef en Casa
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography component="h1" variant="h2" color="text.primary" gutterBottom>
                                Gestiona tu cocina como un profesional
                            </Typography>
                            <Typography variant="h5" color="text.secondary" paragraph>
                                Chef en Casa es la herramienta definitiva para organizar tu despensa, controlar tus ingredientes y descubrir nuevas recetas. Olvídate del desperdicio de comida y optimiza tus compras.
                            </Typography>
                            <Button variant="contained" size="large" component={RouterLink} to="/login" sx={{ mt: 2 }}>
                                Comenzar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img
                                src="/images/intro.jpg"
                                alt="Chef en Casa Hero"
                                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Chef en Casa
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Proyecto Educativo
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Alumno: Leandro'}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Cátedra: DAD - ciclo DAM 2º año'}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="#">
                        Chef en Casa
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default LandingPage;
