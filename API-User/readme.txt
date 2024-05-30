//Patron MVC -- Ver captura 22/5
//Estudiar arquitectura de backend
//hoy ya no se instala body-parser; express ya lo trae.

//La funcion leeruser va en una carpeta MODELS dentro de src o utils.. investigar funcion router.
//Ver captura de pantalla.
//Modelos y controladores: ver que son, a que se refiere.(CARPETAS)
//manejar errores
//Creacion de usuarios, validacion. (if)


// Controllers:

// Propósito: Contiene los controladores, que son responsables de manejar la lógica de la aplicación y las interacciones del usuario.
// Función: Los controladores reciben las solicitudes (requests) del cliente, interactúan con los modelos para obtener datos y luego pasan esos datos a las vistas para que se rendericen. También manejan la lógica de negocio y las reglas de validación.
// Models:

// Propósito: Contiene los modelos, que representan la estructura de los datos y las interacciones con la base de datos.
// Función: Los modelos definen cómo se almacenan los datos, validan la información, y permiten la comunicación con la base de datos. Suelen incluir definiciones de esquemas, validaciones y métodos para crear, leer, actualizar y eliminar datos (CRUD).
// Utils (o Utilities):

// Propósito: Contiene utilidades y funciones auxiliares que son utilizadas en varias partes de la aplicación.
// Función: Aquí se incluyen funciones comunes o helpers que no pertenecen específicamente a ningún modelo, vista o controlador. Ejemplos pueden ser funciones de formato de fechas, funciones de manejo de errores, entre otras.
// Views:

// Propósito: Contiene las vistas, que son responsables de la presentación de los datos.
// Función: Las vistas son plantillas que renderizan la información obtenida de los controladores. Utilizan motores de plantillas como EJS, Pug, Handlebars, entre otros, para generar HTML dinámico que se envía al cliente.


//En un readme suele ir la documentacion del proyecto: ejemplo de una documentacion:
/*
Descripción
Esta aplicación permite a los usuarios registrarse y crear sesiones. Los usuarios pueden iniciar sesión y la aplicación registra y mantiene un historial de las sesiones de cada usuario.

Requisitos Previos
Node.js (versión 14 o superior)
npm (versión 6 o superior)
Instalación
1.Clona el repositorio:
git clone https://github.com/tu-usuario/user-session-app.git
cd user-session-app

2.Instala las dependencias: npm install
Estructura.. ver cuaderno

USO.
1inicia la alpicacion npm start

Abre tu navegador y navega a http://localhost:3000.

Regístrate con un nuevo usuario y luego inicia sesión para comenzar a registrar tus sesiones.

API Endpoints
Autenticación
POST /register - Registro de un nuevo usuario.
POST /login - Inicio de sesión del usuario.
Sesiones
GET /sessions - Obtiene todas las sesiones del usuario autenticado.
POST /sessions - Crea una nueva sesión para el usuario autenticado.
Modelos de Datos
User (Usuario)


User (Usuario)
Session (Sesión)
Seguridad
Las contraseñas se almacenan de forma segura utilizando bcrypt.
Las sesiones se gestionan utilizando tokens JWT.
Contribuir
Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Empuja tus cambios (git push origin feature-nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está bajo la Licencia MIT.

Esta documentación proporciona una visión general clara y concisa de la aplicación, desde la instalación hasta el uso, incluyendo detalles sobre la estructura del proyecto y los modelos de datos. Si necesitas más detalles o una ampliación en algún área específica, házmelo saber.
*/ 