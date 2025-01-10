# Descripción

Este proyecto es una aplicación de e-commerce virtual construida con Next.js. Se utiliza el framework de Next.js para crear una interfaz de usuario moderna y atractiva para los clientes. La aplicación se divide en diferentes páginas, cada una de ellas representando una sección del flujo de la compra. Las páginas se organizan en diferentes rutas, cada una de ellas representando una sección del flujo de la compra.

# Tecnologías

- Next.js: Framework de React para crear aplicaciones web.
- Tailwind CSS: Una librería de CSS para crear diseños atractivos y responsivos.
- React: Una biblioteca de JavaScript para crear interfaces de usuario.
- TypeScript: Un lenguaje de programación para JavaScript que agrega tipos y soporte para la programación orientada a objetos.
- Axios: Una biblioteca de JavaScript para realizar peticiones HTTP.
- Swiper: Una librería de JavaScript para crear presentaciones de diapositivas.

# Instalación

Para instalar las dependencias necesarias, sigue estos pasos:

1. Clonar el repositorio.
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Ejecutar `npm install` para instalar las dependencias.
4. Levantar la base de datos `docker-compose up -d`.
5. Correr las migraciones `npx prisma migrate dev` y `npx prisma generate`.
6. Ejecutar `npm run seed` para generar los datos de prueba.
7. Correr `npm run dev` para iniciar el servidor de desarrollo.
