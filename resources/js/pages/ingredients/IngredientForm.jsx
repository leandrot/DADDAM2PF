import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';

const categories = ['Verduras', 'Frutas', 'Carnes', 'Lácteos', 'Granos', 'Especias', 'Otros'];

const IngredientForm = ({ ingredient, onSuccess, onCancel }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (ingredient) {
            if (ingredient.id) {
                setName(ingredient.name);
                setCategory(ingredient.category);
                setDescription(ingredient.description || '');
                setPreview(ingredient.image ? `/storage/${ingredient.image}` : null);
            }
        } else {

            setName('');
            setCategory('');
            setDescription('');
            setImage(null);
            setPreview(null);
        }
    }, [ingredient]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (ingredient) {
                formData.append('_method', 'PUT');
                await axios.post(`/api/ingredients/${ingredient.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/api/ingredients', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            onSuccess();
            window.dispatchEvent(new Event('ingredientUpdated'));
        } catch (err) {
            console.error("Error saving ingredient", err.response?.data);
            setError("Error al guardar: " + JSON.stringify(err.response?.data?.errors));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                {ingredient ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Categoría</InputLabel>
                <Select
                    value={category}
                    label="Categoría"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                margin="normal"
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                    Imagen del Ingrediente
                </Typography>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                />
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
    );
};

export default IngredientForm;
