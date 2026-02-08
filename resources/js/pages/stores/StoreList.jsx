import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Paper, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Pagination, Box,
    CircularProgress, Dialog, DialogContent, useTheme, useMediaQuery,
    Card, CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StoreForm from './StoreForm';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchStores = async (pageNo = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/stores?page=${pageNo}`);
            setStores(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching stores', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores(page);
        const handleStoreUpdate = () => fetchStores(page);
        window.addEventListener('storeUpdated', handleStoreUpdate);
        return () => window.removeEventListener('storeUpdated', handleStoreUpdate);
    }, [page]);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta tienda?')) {
            try {
                await axios.delete(`/api/stores/${id}`);
                fetchStores(page);
            } catch (error) {
                console.error('Error deleting store', error);
            }
        }
    };

    const handleEdit = (store) => {
        setSelectedStore(store);
        setOpenForm(true);
    };

    const handleCreate = () => {
        setSelectedStore(null);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        fetchStores(page);
    };

    const DesktopView = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Horario</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(stores) && stores.map((store) => (
                        <TableRow key={store.id}>
                            <TableCell>{store.name}</TableCell>
                            <TableCell>{store.address}</TableCell>
                            <TableCell>{store.schedule}</TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" onClick={() => handleEdit(store)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(store.id)}>
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
            {Array.isArray(stores) && stores.map((store) => (
                <Card key={store.id} sx={{ width: '100%', borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {store.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {store.address}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            Horario: {store.schedule}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(store)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(store.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Card>
            ))}
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} disableGutters={isMobile}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ px: isMobile ? 2 : 0 }}>
                <Typography variant="h4" component="h1">
                    Tiendas
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/stores/map')}
                        sx={{ mr: 2 }}
                    >
                        Ver Mapa
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                        size={isMobile ? "small" : "medium"}
                    >
                        {isMobile ? "Nueva" : "Nueva Tienda"}
                    </Button>
                </Box>
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
                    <StoreForm
                        store={selectedStore}
                        onSuccess={handleFormClose}
                        onCancel={() => setOpenForm(false)}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default StoreList;
