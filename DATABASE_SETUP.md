# Configuración de la Base de Datos

Este proyecto utiliza **PostgreSQL**. Aquí tienes los pasos para crear y configurar la base de datos.

## Prerrequisitos

Asegúrate de tener PostgreSQL instalado y ejecutándose.

## Pasos para crear la base de datos

1.  **Acceder a PostgreSQL**:
    Abre tu terminal y ejecuta:
    ```bash
    psql postgres
    ```

2.  **Crear la base de datos**:
    Ejecuta el siguiente comando SQL:
    ```sql
    CREATE DATABASE problemas_urbanos;
    ```

3.  **Conectarse a la base de datos**:
    ```sql
    \c problemas_urbanos
    ```

4.  **Ejecutar el script de esquema**:
    Copia y pega el contenido del archivo `schema.sql` en la terminal de `psql`, o ejecútalo desde la línea de comandos del sistema:
    ```bash
    psql -d problemas_urbanos -f schema.sql
    ```

## Configuración de Variables de Entorno

Asegúrate de configurar las variables de entorno para que la aplicación pueda conectarse a la base de datos. Crea un archivo `.env` en la raíz del proyecto (si no existe) y agrega:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=problemas_urbanos
```

## Poblar la base de datos (Datos de prueba)

Si deseas cargar datos de prueba (usuarios, categorías, reportes, etc.), he creado un archivo `seed.sql`.

1.  **Ejecutar el script de seed**:
    ```bash
    psql -d problemas_urbanos -f seed.sql
    ```
    O copiando y pegando el contenido de `seed.sql` en tu terminal SQL.

