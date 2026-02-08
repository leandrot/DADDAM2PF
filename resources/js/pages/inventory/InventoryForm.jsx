import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Alert, Autocomplete } from '@mui/material';

const units = ['unidades', 'kg', 'g', 'l', 'ml', 'tazas', 'cucharadas'];
const locations = ['Nevera', 'Congelador', 'Despensa', 'Armario'];

const InventoryForm = ({ item, onSuccess, onCancel }) => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/ingredients?all=true').then(res => {
            setIngredients(res.data.data);
        });
    }, []);

    useEffect(() => {
        if (item) {
            setIngredientId(item.ingredient_id);
            setQuantity(item.quantity);
            setUnit(item.unit);
            const formattedDate = item.expiration_date ? new Date(item.expiration_date).toISOString().split('T')[0] : '';
            setExpirationDate(formattedDate);
            setLocation(item.location || '');
        } else {
            setIngredientId('');
            setQuantity('');
            setUnit('');
            setExpirationDate('');
            setLocation('');
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = {
            ingredient_id: ingredientId,
            quantity,
            unit,
            expiration_date: expirationDate,
            location
        };

        try {
            if (item) {
                await axios.put(`/api/inventory/${item.id}`, data);
            } else {
                await axios.post('/api/inventory', data);
            }
            onSuccess();
            window.dispatchEvent(new Event('inventoryUpdated'));
        } catch (err) {
            console.error("Error saving inventory", err);
            setError('Error al guardar. Verifica los datos.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                {item ? 'Editar Inventario' : 'Agregar a Inventario'}
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Ingrediente</InputLabel>
                <Select
                    value={ingredientId}
                    label="Ingrediente"
                    onChange={(e) => setIngredientId(e.target.value)}
                >
                    {ingredients.map((ing) => (
                        <MenuItem key={ing.id} value={ing.id}>{ing.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box display="flex" gap={2}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Unidad</InputLabel>
                    <Select
                        value={unit}
                        label="Unidad"
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        {units.map((u) => (
                            <MenuItem key={u} value={u}>{u}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <FormControl fullWidth margin="normal">
                <InputLabel>Ubicación</InputLabel>
                <Select
                    value={location}
                    label="Ubicación"
                    onChange={(e) => setLocation(e.target.value)}
                >
                    {locations.map((loc) => (
                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                margin="normal"
                fullWidth
                label="Fecha de Caducidad"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
    );
};

export default InventoryForm;
