import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ ingredients_count: 0, inventory_count: 0, stores_count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Panel de Control
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, width: '100%' }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Ingredientes
                        </Typography>
                        <Typography component="p" variant="h4">
                            {loading ? <CircularProgress size={24} /> : stats.ingredients_count}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            Total de ingredientes
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, width: '100%' }}>
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Mi Inventario
                        </Typography>
                        <Typography component="p" variant="h4">
                            {loading ? <CircularProgress size={24} /> : stats.inventory_count}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            Items en despensa
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, width: '100%' }}>
                        <Typography variant="h6" color="success.main" gutterBottom>
                            Tiendas
                        </Typography>
                        <Typography component="p" variant="h4">
                            {loading ? <CircularProgress size={24} /> : stats.stores_count}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            Tiendas registradas
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
