# Taller-mecanico-frontend

Frontend para la gestión del taller mecánico, construido con Next.js y Tailwind CSS.

## Ejecución del sistema completo (Con Docker - Recomendado)
Todo el ecosistema (Frontend, Backend y Base de Datos) está orquestado mediante Docker Compose en el repositorio del backend.

**IMPORTANTE:** Para que el despliegue con Docker funcione, debes tener clonados ambos repositorios (frontend y backend) en la misma carpeta padre.

```bash
# Ejemplo de estructura requerida:
# /proyectos
# ├── taller-mecanico-backend
# └── taller-mecanico-frontend

# 1. Clona ambos repositorios:
git clone https://github.com/SrCristian18/taller-mecanico-backend.git
git clone https://github.com/SrCristian18/taller-mecanico-frontend.git

# 2. Ingresa a la carpeta del backend y ejecuta Docker Compose:
cd taller-mecanico-backend
docker-compose up -d --build
```
3. Accede al frontend en tu navegador: `http://localhost:3000`

## Ejecución Local (Sin Docker)
Para ejecutar el frontend de forma local sin Docker, necesitas tener Node.js instalado.

1. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Accede al frontend en: `http://localhost:3000`

*(Nota: Asegúrate de que el backend también esté ejecutándose localmente o a través de Docker para que la comunicación con la API funcione correctamente).*
