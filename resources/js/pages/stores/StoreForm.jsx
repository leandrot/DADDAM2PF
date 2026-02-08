import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Alert, Grid } from '@mui/material';

const StoreForm = ({ store, onSuccess, onCancel }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [schedule, setSchedule] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (store) {
            setName(store.name);
            setAddress(store.address);
            setLatitude(store.latitude);
            setLongitude(store.longitude);
            setSchedule(store.schedule || '');
            setDescription(store.description || '');
        } else {
            setName('');
            setAddress('');
            setLatitude('');
            setLongitude('');
            setSchedule('');
            setDescription('');
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = {
            name,
            address,
            latitude,
            longitude,
            schedule,
            description
        };

        try {
            if (store) {
                await axios.put(`/api/stores/${store.id}`, data);
            } else {
                await axios.post('/api/stores', data);
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError('Error al guardar. Verifica los datos.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                {store ? 'Editar Tienda' : 'Nueva Tienda'}
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
            <TextField
                margin="normal"
                required
                fullWidth
                label="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Latitud"
                        type="number"
                        inputProps={{ step: "0.000001" }}
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Longitud"
                        type="number"
                        inputProps={{ step: "0.000001" }}
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </Grid>
            </Grid>

            <TextField
                margin="normal"
                fullWidth
                label="Horario"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="Ej. Lunes a Viernes 9:00 - 20:00"
            />
            <TextField
                margin="normal"
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
    );
};

export default StoreForm;
