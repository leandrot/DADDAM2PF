import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Paper, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Pagination, Box,
    CircularProgress, Dialog, DialogContent, useTheme, useMediaQuery,
    Grid, Card, CardContent, CardMedia, CardActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IngredientForm from './IngredientForm';

const IngredientsList = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchIngredients = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/ingredients?page=${page}`);
            setIngredients(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching ingredients", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
        const handleIngredientUpdate = () => fetchIngredients(currentPage);
        window.addEventListener('ingredientUpdated', handleIngredientUpdate);
        return () => window.removeEventListener('ingredientUpdated', handleIngredientUpdate);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este ingrediente?')) {
            try {
                await axios.delete(`/api/ingredients/${id}`);
                fetchIngredients(currentPage);
            } catch (error) {
                console.error("Error deleting ingredient", error);
            }
        }
    };

    const handleEdit = (ingredient) => {
        setSelectedIngredient(ingredient);
        setOpenForm(true);
    };

    const handleCreate = () => {
        setSelectedIngredient(null);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        fetchIngredients(page);
    };

    const DesktopView = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Categoría</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                            <TableCell>
                                {ingredient.image ? (
                                    <Box
                                        component="img"
                                        sx={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 1 }}
                                        src={`/storage/${ingredient.image}`}
                                        alt={ingredient.name}
                                    />
                                ) : (
                                    <Box
                                        sx={{ height: 50, width: 50, bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Typography variant="caption" color="text.secondary">No img</Typography>
                                    </Box>
                                )}
                            </TableCell>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.category}</TableCell>
                            <TableCell>{ingredient.description}</TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" onClick={() => handleEdit(ingredient)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(ingredient.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const MobileView = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ingredients.map((ingredient) => (
                <Card key={ingredient.id} sx={{ width: '100%', borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {ingredient.image ? (
                            <CardMedia
                                component="img"
                                sx={{ width: 120, objectFit: 'cover' }}
                                image={`/storage/${ingredient.image}`}
                                alt={ingredient.name}
                            />
                        ) : (
                            <Box
                                sx={{ width: 120, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Typography variant="caption" color="text.secondary">No img</Typography>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    {ingredient.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {ingredient.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {ingredient.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(ingredient)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(ingredient.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ))}
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} disableGutters={isMobile}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ px: isMobile ? 2 : 0 }}>
                <Typography variant="h4" component="h1">
                    Ingredientes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    size={isMobile ? "small" : "medium"}
                >
                    {isMobile ? "Nuevo" : "Nuevo Ingrediente"}
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {isMobile ? <MobileView /> : <DesktopView />}
                    <Box display="flex" justifyContent="center" p={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    <IngredientForm
                        ingredient={selectedIngredient}
                        onSuccess={handleFormClose}
                        onCancel={() => setOpenForm(false)}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default IngredientsList;
