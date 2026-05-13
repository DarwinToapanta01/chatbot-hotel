# Hotel Manager PMS - Frontend

Sistema moderno de gestión de reservas y administración hotelera (PMS - Property Management System), diseñado con una arquitectura basada en React y Vite. Este frontend proporciona una interfaz dual: una orientada a los huéspedes para explorar y gestionar reservas (con un asistente virtual integrado), y otra exclusiva para recepcionistas y administradores para el control del inventario de habitaciones.

---

## 1. Arquitectura y Flujo de Vida

El proyecto sigue una arquitectura en capas modularizada, centralizando el estado global y delegando las responsabilidades de enrutamiento a React Router.

### Ciclo de vida de la aplicación:
1. **Carga Inicial:** Al acceder a la aplicación, Vite sirve el `index.html` y el bundle de `main.tsx`.
2. **Hidratación del Estado:** Se monta `AuthProvider` (el Contexto), el cual revisa inmediatamente el `localStorage` en busca de un token JWT existente para restaurar la sesión del usuario.
3. **Enrutamiento:** `AppRoutes` lee el estado de autenticación y permite o deniega el paso hacia rutas protegidas (`<PrivateRoute>` y `<AdminRoute>`).
4. **Interacción:** El usuario interactúa con los componentes (ej. haciendo clic en "Iniciar Sesión"). Esto despliega el `LoginModal`, que al completarse, actualiza el `AuthContext`, provocando un re-render que desbloquea nuevas partes de la interfaz (como el botón "Mis Reservas" o "Recepción").
5. **Comunicación Backend:** Todas las peticiones HTTP seguras adjuntan el token JWT y procesan los datos en la vista.

---

## 2. Estructura del Proyecto

El código fuente está contenido en el directorio `src/`, organizado estratégicamente por responsabilidad:

- **/assets**: Recursos estáticos, imágenes e íconos locales.
- **/components**: Componentes de UI reutilizables.
  - `/auth`: Formularios y modales de inicio de sesión y registro.
  - `/layout`: Elementos estructurales que envuelven las páginas (`MainLayout`, `AdminLayout`, `Header`, `Footer`).
  - `/management`: Componentes exclusivos del panel de administración (`RoomTable`, `FilterPanel`, `ReceptionSidebar`).
  - `/ui`: Componentes primitivos base (Botones, Inputs, etc.) diseñados con Tailwind.
  - `/chatbot`: Lógica y UI del asistente virtual interactivo.
- **/context**: Proveedores de estado global (ej. `AuthContext.tsx` para la sesión de usuario).
- **/pages**: Componentes de nivel superior que actúan como vistas de las rutas (`Home`, `Management`, `MisReservas`, `ConfiguracionUsuario`).
- **/services**: Capa de abstracción para realizar peticiones HTTP hacia la API Backend.

---

## 3. Lógica y Gestión del Estado

La gestión del estado se maneja primordialmente utilizando la **Context API** nativa de React y Hooks personalizados.

- **Autenticación (AuthContext):** Se encarga de guardar el perfil del `usuario` (id, nombre, email, rol, teléfono) y el `token` de sesión. Expone métodos como `login`, `logout` y `updateUser`.
- **Estado Local:** La mayoría de los componentes manejan su propio estado de interfaz (ej. carga, errores, valores de formularios) utilizando `useState` y `useEffect`.
- **Consumo de APIs:** Las llamadas al backend se realizan usando la API nativa `fetch`. Las peticiones a rutas protegidas inyectan dinámicamente el header `Authorization: Bearer <token>`. Las URLs se construyen utilizando la variable de entorno `import.meta.env.VITE_API_URL`.

---

## 4. Componentes Clave

1. **`AuthContext / AuthProvider`**: 
   - *Rol:* El corazón de la seguridad frontend.
   - *Funcionalidad:* Valida si el usuario es `CLIENTE` o `ADMIN` y expone dicha información a toda la aplicación para ocultar o mostrar rutas (ej. la barra lateral de administración).

2. **`ChatWidget`**:
   - *Rol:* Interfaz de atención automatizada.
   - *Funcionalidad:* Es un componente flotante global que se comunica mediante `POST` con la API de NLP del backend. Mantiene un `sessionId` para recordar el historial de chat con el huésped.

3. **`RoomTable` (Gestión)**:
   - *Rol:* Vista principal para el recepcionista.
   - *Funcionalidad:* Recibe un array de `habitaciones` como *prop*. Permite visualizar el estado en tiempo real, filtrar inventario y gestionar disponibilidades basándose en las acciones del administrador.

4. **`Management` (Página)**:
   - *Rol:* Controlador de la vista administrativa.
   - *Funcionalidad:* Orquesta los componentes `FilterPanel`, `RoomTable` y `ReceptionSidebar`. Contiene la lógica compleja de filtrado local y las peticiones a la API para obtener el inventario del hotel.

---

## 5. Dependencias Principales

Las dependencias clave seleccionadas para este proyecto son:

- **`react` & `react-dom` (v19)**: Biblioteca principal para la creación de la interfaz de usuario.
- **`react-router-dom`**: Manejo del enrutamiento SPA (Single Page Application) y protección de rutas.
- **`tailwindcss` (v4) & `@tailwindcss/vite`**: Framework CSS de utilidades para un diseño ágil, responsivo y mantenible sin necesidad de hojas de estilo externas complejas.
- **`lucide-react`**: Colección de íconos vectoriales SVG limpios y ligeros.
- **`clsx` & `tailwind-merge`**: Utilidades para combinar clases dinámicas de Tailwind de forma segura, evitando conflictos de especificidad en componentes reutilizables (como botones).

---

## 6. Guía de Instalación y Ejecución

Asegúrate de tener Node.js instalado (v18 o superior recomendado).

1. **Clonar el repositorio y entrar al directorio:**
   ```bash
   git clone <url-del-repositorio>
   cd proyecto-hotel
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (junto a `package.json`) y agrega la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Levantar el entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible típicamente en `http://localhost:5173`.*

5. **Construir para producción:**
   ```bash
   npm run build
   ```
   *Esto generará los archivos estáticos optimizados en la carpeta `dist/`.*
