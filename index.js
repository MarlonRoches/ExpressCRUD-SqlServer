const express = require("express")
const app = express()
const port =3000
const DBContext =  require("./DB/DBClient")

//iniciando la conexion a la BD
DBContext.SQL_Connect()

app.get("/" , (req,res) => {
    res.send("Hola Mundo")
})


app.get("/usp_obtener/:id" ,async (req,res) => {
    var usuario = await DBContext.usp_obtener(req.params.id);
    res.send(usuario)
})

app.listen( port, () => { console.log( `Escuchando en el puerto ${port}`)})
