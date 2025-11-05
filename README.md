**LA DORADA**

Este proyecto corresponde al frontend de la aplicación LaDorada, desarrollado utilizando Angular CLI versión 19.2.3.
El backend del sistema fue implementado y desplegado en AWS (Amazon Web Services), garantizando escalabilidad, seguridad y alta disponibilidad.

**Descripción general**

LaDorada es una aplicación web enfocada en la gestión y experiencia de compra de productos.
Incluye las siguientes funcionalidades principales:

🛍️ **Catálogo de productos:** visualización y exploración de los artículos disponibles.

🛒 **Carrito de compras:** permite añadir, modificar o eliminar productos antes de realizar la compra.

📦 **Gestión de estado de productos:** seguimiento del stock y disponibilidad de cada artículo.

🔐 **Sistema de autenticación:** módulo de login que valida las credenciales del usuario para procesar las compras de manera segura.

**Servidor de desarrollo**

Para iniciar un servidor local de desarrollo, ejecuta:

*ng serve*


Luego, abre el navegador y accede a http://localhost:4200/. La aplicación se recargará automáticamente al detectar cambios en los archivos fuente.


**Generación de código**

Angular CLI incluye potentes herramientas para la generación de código (scaffolding).
Para crear un nuevo componente, utiliza:

*ng generate component component-name*


Para obtener una lista completa de schematics disponibles, ejecuta:

*ng generate --help*


**Compilación del proyecto**

Para compilar el proyecto, utiliza:

*ng build*


Los artefactos generados se almacenarán en el directorio dist/.
La compilación de producción optimiza la aplicación para un mejor rendimiento y tiempos de carga reducidos.

**Ejecución de pruebas unitarias**

Para ejecutar las pruebas unitarias con el test runner Karma, ejecuta:

*ng test*

**Recursos adicionales**

Para más información sobre Angular CLI, visita la documentación oficial:
👉 Angular CLI Overview and Command Reference

📘 Información del proyecto

Este proyecto fue desarrollado como parte del proyecto final del curso de Desarrollo Web en la Universidad de Ciencias Aplicadas.
El objetivo principal fue aplicar los conocimientos adquiridos en el diseño, desarrollo e implementación de aplicaciones web modernas utilizando tecnologías frontend con Angular y servicios en la nube mediante AWS.
