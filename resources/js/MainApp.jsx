import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Recipes from './pages/Recipes';
import MainLayout from './layouts/MainLayout';
import GuestLayout from './layouts/GuestLayout';
import Dashboard from './pages/Dashboard';
import IngredientsList from './pages/ingredients/IngredientsList';
import InventoryList from './pages/inventory/InventoryList';
import StoreList from './pages/stores/StoreList';
import StoreMap from './pages/stores/StoreMap';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function MainApp() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route element={<GuestLayout />}>
                            <Route path="/login" element={<Login />} />
                        </Route>

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<MainLayout />}>
                                {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/recipes" element={<Recipes />} />
                                <Route path="/ingredients" element={<IngredientsList />} />
                                <Route path="/inventory" element={<InventoryList />} />
                                <Route path="/stores" element={<StoreList />} />
                                <Route path="/stores/map" element={<StoreMap />} />
                            </Route>
                        </Route>

                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MainApp;
