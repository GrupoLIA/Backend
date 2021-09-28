# Backend

Backend de soporte implementado en node para proveer endpoints a un panel de administración y una aplicación móvil.
Forma parte de la arquitectura de una aplicación de empleos de ámbito regional.

## Instalación

1. Instalar [node] y opcionalmente [mongo] para desarrollo.
1. Descargar proyecto con `git clone`.
1. En una terminal, descargar paquetes del proyecto con `npm install`.
1. Colocar dos ficheros de variables de entorno en el directorio del proyecto:
   - `.env`: para entorno de deploy en un servidor con mongo.
   - `local.env`: para entorno en un base de datos local.
1. Ejecutar con `npm start` o bien `npm run start-local` si es ambiente local (requiere [mongo] instalado).

### Archivos env

Los archivos de variables de entorno deben definir los siguientes parámetros:

- `PORT`: especifica el puerto en el que estará recibiendo peticiones el backend.
- `SECRETKEY`: utilizado por _JSON Web Token_ para firmar los tokens y validar a los usuarios.
- `DB`: conexión con el servidor de la base de datos, puede ser local o estar en la nube.

## Extras

Este backend provee un framework para realizar testing unitarios que permiten comprobar el funcionamiento de los endpoints.
Para ejecutarlos en el ambiente local, ejecutar `npm test` en una terminal.

Es posible también ejecutar los tests en el ambiente de producción con `npm run test-cloud`. Atención que esto **borrará todo el contenido** de las colecciones en el servidor remoto. Usar con precaución.

## Notas

Para obtener información detallada sobre el proyecto dirigirse a [Aplicacion para Oficios].

[node]: https://nodejs.org
[mongo]: https://www.mongodb.com
[aplicacion para oficios]: https://www.overleaf.com/project/5f46b246abe9bf0001dce417
