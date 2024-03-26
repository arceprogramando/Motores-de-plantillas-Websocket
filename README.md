# Refactor de Una practica con Coderhouse haciendo un patron de controller service y Dao usando handlebars

- ✨Servidor con FileSystem , Express y subida de imagenes con multer y handlebars

## 🧞 Commands 

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             |Para instalar las dependencias necesarias del proyecto|
| `npm run dev`             |Para inicializar los proyectos |


## 🌳 Tree

```text
/
├── files
│       └── carts.json
│       └── products.json
├── src 
│      └──controller
│      └──dao
│      └──files
│               └── carts.json
│               └── products.json
│      └──public
│      └──routers
│      └──services
│      └──views
│      └── app.js
│      └── utils.js
├── .gitignore
├── .eslintrc.json
└── Readme.md
```

## Para la nueva estructura de mis commits voy a utilizar https://www.conventionalcommits.org/en/v1.0.0/

## Herramientas

### Para realizar este Arquitectura

- Backend

| Dependencias /Librerias | Funcionalidad                 |
| --------------- | --------------------------------------------------------------------------- |
| ✅ [node.js]    | Se  instalo a nivel local NodeJs.|
| ✅ [express]   | Se uso la libreria Express de NodeJs.|
| ✅ [nodemon] | Se utilizo nodemon para la recarga automatica del Proyecto | 
| ✅ [multer] | Para la subida de imagenes dentro de la carpeta public/upload|
| ✅ [socket.io] | Se instalo socket.io para trabajar con websocket dentro de nuestro servidor|
| ✅ [sweetalert2] | Importo desde de su CDN link|
- Frontend

| Dependencias /Librerias | Funcionalidad                 |
| --------------- | --------------------------------------------------------------------------- |
| ✅ [express-handlebars] | Se instalo el motor de plantillas express-handlebars|
| ✅ [bootstrap] | Se utiliza bootstrap par dar pequeños estilos


[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[Nodemon]: <https://nodemon.io>
[multer]: <https://www.npmjs.com/package/multer>
[express-handlebars]:<https://www.npmjs.com/package/express-handlebars>
[socket.io]:<https://socket.io/docs/v4/>
[sweetalert2]:<https://sweetalert2.github.io/v10.html>
[bootstrap]:<https://getbootstrap.com>