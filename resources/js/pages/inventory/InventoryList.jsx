import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Paper, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Pagination, Box,
    CircularProgress, Dialog, DialogContent, Chip, useTheme, useMediaQuery,
    Grid, Card, CardContent, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InventoryForm from './InventoryForm';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchInventory = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/inventory?page=${page}`);
            setInventory(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching inventory", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory(currentPage);
        const handleInventoryUpdate = () => fetchInventory(currentPage);
        window.addEventListener('inventoryUpdated', handleInventoryUpdate);
        return () => window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar del inventario?')) {
            try {
                await axios.delete(`/api/inventory/${id}`);
                fetchInventory(currentPage);
            } catch (error) {
                console.error("Error deleting inventory item", error);
            }
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setOpenForm(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        fetchInventory(page);
    };

    const formatDate = (isoString) => {
        if (!isoString) return '-';
        const datePart = isoString.split('T')[0];
        const [year, month, day] = datePart.split('-');
        return `${day}-${month}-${year}`;
    };

    const DesktopView = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Ingrediente</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Ubicación</TableCell>
                        <TableCell>Caducidad</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.ingredient?.image ? (
                                    <Box
                                        component="img"
                                        sx={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 1 }}
                                        src={`/storage/${item.ingredient.image}`}
                                        alt={item.ingredient.name}
                                    />
                                ) : (
                                    <Box
                                        sx={{ height: 50, width: 50, bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Typography variant="caption" color="text.secondary">No img</Typography>
                                    </Box>
                                )}
                            </TableCell>
                            <TableCell>{item.ingredient?.name}</TableCell>
                            <TableCell>{item.quantity} {item.unit}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>
                                {item.expiration_date ? (
                                    <Chip
                                        label={formatDate(item.expiration_date)}
                                        color={new Date(item.expiration_date) < new Date() ? 'error' : 'default'}
                                        size="small"
                                    />
                                ) : '-'}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" onClick={() => handleEdit(item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(item.id)}>
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
            {inventory.map((item) => (
                <Card key={item.id} sx={{ width: '100%', borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {item.ingredient?.image ? (
                            <CardMedia
                                component="img"
                                sx={{ width: 120, objectFit: 'cover' }}
                                image={`/storage/${item.ingredient.image}`}
                                alt={item.ingredient?.name}
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
                                    {item.ingredient?.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {item.quantity} {item.unit}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ubicación: {item.location || '-'}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    {item.expiration_date && (
                                        <Chip
                                            label={formatDate(item.expiration_date)}
                                            color={new Date(item.expiration_date) < new Date() ? 'error' : 'default'}
                                            size="small"
                                        />
                                    )}
                                </Box>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(item.id)}>
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
                    Mi Inventario
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    size={isMobile ? "small" : "medium"}
                >
                    {isMobile ? "Agregar" : "Agregar Ingrediente"}
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
                    <InventoryForm
                        item={selectedItem}
                        onSuccess={handleFormClose}
                        onCancel={() => setOpenForm(false)}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default InventoryList;
