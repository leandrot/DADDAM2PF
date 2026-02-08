import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const StoreMap = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await axios.get('/api/stores?all=true');
                setStores(res.data.data || res.data);
            } catch (error) {
                console.error("Error fetching stores for map", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    const defaultCenter = [28.12842371, -15.44939595];

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" component="h1">
                    Mapa de Tiendas
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/stores')}
                >
                    Volver a la lista
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                    <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {stores.map((store) => (
                            store.latitude && store.longitude && (
                                <Marker
                                    key={store.id}
                                    position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
                                >
                                    <Popup>
                                        <Typography variant="subtitle1" fontWeight="bold">{store.name}</Typography>
                                        <Typography variant="body2">{store.address}</Typography>
                                        <Typography variant="caption" display="block">{store.schedule}</Typography>
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>
                </Box>
            )}
        </Container>
    );
};

export default StoreMap;
