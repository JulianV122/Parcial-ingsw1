const mongoose = require("mongoose");
const app = require("./app");
const {DB_HOST,DB_USER,DB_PASSWORD} = require("./config")

/* Acceder a la configuracion del archivo .env */
require("dotenv").config();

/* Acceder a variables del .env se usa process.env con dotenv */
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Conectados por el puerto ${port}`))
/* Crear conexion a bd mongo */
/* mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST} */
/* mongodb+srv://julianv12:<Juli2005>@cluster0.6czi331.mongodb.net/ */
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`).then(()=>console.log("Conectado a mongoDB")).catch((err)=>console.log(`Error al conectar a mongoDB ${err}`))
