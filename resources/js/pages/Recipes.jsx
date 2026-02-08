import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, ListItemIcon, Button, Grid } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const recipes = [
    {
        id: 1,
        title: 'Pasta Carbonara',
        description: 'Auténtica pasta italiana con huevo, queso pecorino, guanciale y pimienta negra. Un clásico reconfortante y lleno de sabor.',
        ingredients: ['Espaguetis', 'Huevos', 'Queso Pecorino', 'Guanciale (o panceta)', 'Pimienta negra'],
        image: '/images/pasta-carbonara.jpg'
    },
    {
        id: 2,
        title: 'Pollo al Curry',
        description: 'Trozos tiernos de pollo cocinados a fuego lento en una salsa cremosa de curry con leche de coco y especias aromáticas.',
        ingredients: ['Pechuga de pollo', 'Leche de coco', 'Cebolla', 'Ajo', 'Jengibre', 'Curry en polvo', 'Cúrcuma'],
        image: '/images/pollo-curry.jpg'
    },
    {
        id: 3,
        title: 'Ensalada César',
        description: 'Fresca lechuga romana con crutones crujientes, queso parmesano y el aderezo César original con un toque de anchoas.',
        ingredients: ['Lechuga romana', 'Pan (para crutones)', 'Queso Parmesano', 'Ajo', 'Anchoas', 'Yema de huevo', 'Aceite de oliva'],
        image: '/images/ensalada-cesar.jpg'
    }
];

const Recipes = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AutoFixHighIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" component="h1">
                    Recetas Sugeridas
                </Typography>
            </Box>

            <Grid container spacing={3} direction="column">
                {recipes.map((recipe) => (
                    <Grid item key={recipe.id}>
                        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: { xs: '100%', md: 300 },
                                    height: 200,
                                    borderRadius: 1,
                                    mr: { md: 3 },
                                    mb: { xs: 2, md: 0 },
                                    flexShrink: 0,
                                    objectFit: 'cover'
                                }}
                                image={recipe.image}
                                alt={recipe.title}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                                    <Typography component="div" variant="h5" gutterBottom>
                                        {recipe.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {recipe.description}
                                    </Typography>

                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        Ingredientes:
                                    </Typography>
                                    <List dense disablePadding>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                                <ListItemIcon sx={{ minWidth: 24 }}>
                                                    <CheckCircleOutlineIcon fontSize="small" color="success" />
                                                </ListItemIcon>
                                                <ListItemText primary={ingredient} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Recipes;
