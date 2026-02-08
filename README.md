# Chef en Casa - Gestión de Despensa y Recetas

Bienvenido a **Chef en Casa**, una aplicación web diseñada para ayudarte a organizar tu cocina. Gestiona tus ingredientes, controla tu inventario y ubica tus tiendas favoritas, todo desde una interfaz moderna y fácil de usar.

Este proyecto se ha pensado para cumplir con los requisitos de los trabajos finales de PGL, AED y DAD. Para PGL se ha utilizado **Laravel** como backend para la gestión de la base de datos via API para la versión con **React Native**. Luego se han desarrollado vistas en **Blade** y migrado a rutas web para la versión de AED. Por último ha sido migrado de una arquitectura tradicional con Blade a una Single Page Application (SPA) utilizando **React** y **Material UI**, manteniendo **Laravel** para el backend, para la versión de DAD, que es la que nos ocupa.

En todos los casos se ha utilizado **MySQL** como base de datos.

## Tecnologías Utilizadas

*   **Backend**: Laravel 12 (PHP 8.2+)
*   **Frontend**: React 18
*   **Estilos**: Material UI (MUI) v5
*   **Enrutamiento**: React Router Dom v6
*   **Empaquetador**: Vite
*   **Base de Datos**: MySQL / MariaDB
*   **Mapas**: Leaflet y React Leaflet

## Requisitos Funcionales

El sistema cumple con los siguientes requisitos funcionales divididos por módulos:

### 1. Gestión de Usuarios
*   **Autenticación**: Permitir a los usuarios iniciar sesión (Login) y cerrar sesión (Logout) de forma segura.

### 2. Gestión de Ingredientes
*   **Consulta**: Visualizar un listado paginado de ingredientes disponibles en la plataforma.
*   **Administración**: Crear, editar y eliminar ingredientes (CRUD completo).

### 3. Gestión de Inventario Personal
*   **Agregar Stock**: Añadir ingredientes existentes al inventario personal del usuario.
*   **Control de Stock**: Modificar la cantidad, unidad de medida, fecha de caducidad y ubicación (nevera, despensa, etc.).
*   **Eliminación**: Retirar productos del inventario.

### 4. Gestión de Tiendas y Mapa
*   **Directorio**: Mantener un listado de tiendas y supermercados.
*   **Geolocalización**: Almacenar coordenadas (latitud/longitud) de cada tienda.
*   **Visualización**: Mostrar las tiendas en un mapa interactivo y permitir la navegación a sus detalles.

## Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

### Prerrequisitos
-   Composer
-   Node.js y npm
-   Servidor de Base de Datos (MySQL)

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/chef-en-casa.git
    cd chef-en-casa
    ```

2.  **Instalar dependencias de PHP**
    ```bash
    composer install
    ```

3.  **Instalar dependencias de JavaScript**
    ```bash
    npm install
    ```

4.  **Configurar el entorno**
    Duplica el archivo `.env.example` y renómbralo a `.env`. Configura tus credenciales de base de datos.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5.  **Migrar la base de datos**
    ```bash
    php artisan migrate
    ```

    Opcionalmente, carga datos de ejemplo:
    ```bash
    php artisan db:seed
    ```

6.  **Ejecutar la aplicación**
    Necesitarás dos terminales:
    
    *Terminal 1 (Backend):*
    ```bash
    php artisan serve
    ```

    *Terminal 2 (Frontend - Desarrollo):*
    ```bash
    npm run dev
    ```

    O compila para producción:
    ```bash
    npm run build
    ```

7.  **Acceder**
    Abre tu navegador en `http://localhost:8000`.

## Estructura del Proyecto (React)

El código fuente del frontend se encuentra en `resources/js`:

-   `components/`: Componentes reutilizables (Login, Formularios, etc.).
-   `layouts/`: Estructuras de página (MainLayout, GuestLayout).
-   `pages/`: Vistas principales (Dashboard, Ingredients, Inventory, Stores).
-   `context/`: Gestión del estado global (AuthContext).
-   `App.jsx`: Configuración de rutas y punto de entrada.


## Figma

Se ha creado un prototipo en Figma para visualizar el diseño de la aplicación.

[Figma](https://www.figma.com/proto/5x8PLhJw5A6SbxAn8uG2P3/DAD-Proyecto-Final?node-id=0-1&t=MaUXTe9XWpzhGM7L-1)

## Repositorio GitHub

El código fuente se encuentra en el siguiente repositorio:

[GitHub](https://github.com/leandrot/DADDAM2PF)    



---
*Desarrollado como proyecto educativo para 2º DAM.*